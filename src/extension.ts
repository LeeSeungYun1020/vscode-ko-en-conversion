import * as vscode from 'vscode';
import * as unicode from './unicode';

export function activate(context: vscode.ExtensionContext) {
	console.log('"ko-en-conversion" is now active!');

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('markdown', new ConversionAction(), {
			providedCodeActionKinds: ConversionAction.providedCodeActionKinds
		})
	);

	const menu = vscode.commands.registerCommand('ko-en-conversion.conversion', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const [range, convWord] = conversion.convert(document, selection);
			editor.edit(editBuilder => {
				editBuilder.replace(range, convWord);
			});

		} else {
			vscode.window.showWarningMessage('한영 변환을 수행할 부분을 선택한 후 명령을 실행하십시오.');
		}
	});

	context.subscriptions.push(menu);
}

export class Conversion {
	private map: Map<string, string> = unicode.getKoMap();

	public convert(document: vscode.TextDocument, range: vscode.Range | vscode.Selection): [vscode.Range, string] {
		let first = range.start.character;
		let last = range.end.character;
		let text = document.lineAt(range.start.line).text;

		// multi-line
		if (range.start.line !== range.end.line) {
			last += (text.length + 1);
			for (let index = range.start.line + 1; index <= range.end.line; index++) {
				const line = document.lineAt(index).text;
				text += `\n${line}`;
				if (index !== range.end.line) {
					last += (line.length + 1);
				}
			}
		}

		// 단어 선택
		let wordRange = range;
		// 선택하지 않은 경우 -> 단어 범위 계산 필요
		if (range.isEmpty) {
			[first, last] = this.findWordRange(text, first, last);
			wordRange = new vscode.Range(new vscode.Position(range.start.line, first), new vscode.Position(range.end.line, last));
		}
		const word = text.substring(first, last);


		// 단어 변환
		const convWord = this.conversionWord(word);
		return [wordRange, convWord];
	}

	// return selected word, last
	private findWordRange(text: string, first: number, last: number): number[] {
		if (text[first] === ' ') {
			first--;
		}
		while (first >= 0 && text[first] !== ' ') {
			first--;
		}
		while (last < text.length && text[last] !== ' ') {
			last++;
		}
		return [first + 1, last];
	}

	private conversionWord(word: string): string {
		let cText = "";
		for (const c of word) {
			const code = c.charCodeAt(0);

			if (0xAC00 <= code && code <= 0xD7AF) { // 한글 글자마디
				// 초중종성 분리
				const idx = code - 0xAC00;
				const top = Math.floor(Math.floor(idx / 28) / 21) + 0x1100;
				const mid = Math.floor(idx / 28) % 21 + 0x1161;
				const bot = idx % 28 + 0x11A7;
				// 영어로 변환
				// 종성이 없는 경우 처리
				if (bot === 0x11A7) {
					cText += `${this.map.get(String.fromCharCode(top))}${this.map.get(String.fromCharCode(mid))}`;
				} else {
					cText += `${this.map.get(String.fromCharCode(top))}${this.map.get(String.fromCharCode(mid))}${this.map.get(String.fromCharCode(bot))}`;
				}
			} else if (65 <= code && code <= 90 || 97 <= code && code <= 122) { // 영어 알파벳
				//cText += String.fromCharCode(this.map.get(c)?.charCodeAt(0)!!);
				cText += c;
				vscode.window.showWarningMessage('영어 -> 한글 변환을 아직 지원하지 않습니다.');
			} else { // 이외 문자
				cText += (this.map.get(c) ?? c);
			}
		}
		return cText;
	}
}
const conversion = new Conversion();

// 한영 변환 code action 클래스
export class ConversionAction implements vscode.CodeActionProvider {
	// code action 종류
	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];
	// code action
	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
		const [wordRange, convWord] = conversion.convert(document, range);
		const replaceWordFix = this.makeConvFix(document, wordRange, convWord);
		return [
			replaceWordFix,
		];
	}
	// 교체할 단어로 수정하는 함수
	private makeConvFix(document: vscode.TextDocument, range: vscode.Range, convWord: string): vscode.CodeAction {
		const fix = new vscode.CodeAction(`한영 변환 ${convWord}`, vscode.CodeActionKind.QuickFix);
		fix.edit = new vscode.WorkspaceEdit();
		fix.edit.replace(document.uri, range, convWord);
		return fix;
	}

}

export function deactivate() { }
