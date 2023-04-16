import * as vscode from 'vscode';
import * as unicode from './unicode';
import * as nls from 'vscode-nls';

//const translate = nls.loadMessageBundle();
const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

export function activate(context: vscode.ExtensionContext) {
	console.log('"ko-en-conversion" is now active!');
	// Push code action provider
	if (vscode.workspace.getConfiguration("ko-en-conversion").command.action.display ?? true) {
		if (vscode.workspace.getConfiguration("ko-en-conversion").command.action.korean) {
			context.subscriptions.push(
				vscode.languages.registerCodeActionsProvider('*', new ConversionAction(Lang.ko), {
					providedCodeActionKinds: ConversionAction.providedCodeActionKinds
				})
			);
		}
		if (vscode.workspace.getConfiguration("ko-en-conversion").command.action.english) {
			context.subscriptions.push(
				vscode.languages.registerCodeActionsProvider('*', new ConversionAction(Lang.en), {
					providedCodeActionKinds: ConversionAction.providedCodeActionKinds
				})
			);
		}
		context.subscriptions.push(
			vscode.languages.registerCodeActionsProvider('*', new ConversionAction(), {
				providedCodeActionKinds: ConversionAction.providedCodeActionKinds
			})
		);
	}
	// Push commands
	context.subscriptions.push(
		vscode.commands.registerCommand('ko-en-conversion.conversion', () => {
			conversion.edit(selcetLang(vscode.workspace.getConfiguration("ko-en-conversion").language.target));
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('ko-en-conversion.english', () => {
			conversion.edit(Lang.en);
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('ko-en-conversion.korean', () => {
			conversion.edit(Lang.ko);
		})
	);
}

export enum Lang {
	all, ko, en
}

export function selcetLang(str: string): Lang {
	switch (str) {
		case "All":
		case "모두":
			return Lang.all;
		case "Only Korean -> English":
		case "한글만 영어로":
			return Lang.en;
		default:
			return Lang.ko;
	}
}

export enum KoState {
	top, mid, bot
}

export class Conversion {
	private map: Map<string, string> = unicode.getMap();
	private nfcMap: Map<string, string> = unicode.nfcMap();

	public convert(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, lang: Lang = Lang.all): [vscode.Range, string] {
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
		const convWord = this.conversionWord(word, lang);
		return [wordRange, convWord];
	}

	public edit(lang: Lang) {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const [range, convWord] = this.convert(document, selection, lang);
			editor.edit(editBuilder => {
				editBuilder.replace(range, convWord);
			});

		} else {
			vscode.window.showWarningMessage(localize("error.selection", "한영 변환을 수행할 부분을 선택한 후 명령을 실행하십시오."));
		}
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

	private conversionWord(word: string, lang: Lang): string {
		const seperate = word.normalize('NFKD');
		let change = "";
		let prev = ' ';
		let step = KoState.top;
		for (const c of seperate) {
			const code = c.charCodeAt(0);
			if (lang !== Lang.ko && ((0x1100 <= code && code <= 0x11FF) || (0x3131 <= code && code <= 0x318E))) { // 한글 자음, 모음
				// 한->영
				change += (this.map.get(c) ?? c);
				step = KoState.top;
			} else if (lang !== Lang.en && ((65 <= code && code <= 90) || (97 <= code && code <= 122))) { // 영어 알파벳
				// 영->한
				const now = this.map.get(c) ?? c;
				const nowCode = now.charCodeAt(0);
				if (0x1161 <= nowCode && nowCode <= 0x1175) { // 모음인 경우
					if (step === KoState.top) { // 그대로 또는 받침 가져오기
						const bottom = this.getLastBottom(change);
						if (bottom) {// 받침이 있는 경우
							change = change.substring(0, change.length - 1);
							change += bottom.join("");
							change += now;
							step = KoState.bot;
						} else {// 받침이 없는 경우
							change += now;
							step = KoState.top;
						}
					} else if (step === KoState.mid) { // 그대로
						change += now;
						step = KoState.bot;
					} else { // 연속 모음 확인
						const vowel = this.map.get(prev + c);
						if (vowel) { // 모음을 합칠 수 있는 경우(예: 와)
							change = change.substring(0, change.length - 1);
							change += vowel;
							step = KoState.bot;
						} else { // 단순 모음 반복인 경우
							change += now;
							step = KoState.top;
						}
					}
				} else { // 자음인 경우
					if (step === KoState.top) { // 받침에 넣거나 그대로
						const bottom = this.getLastBottom(change);
						if (bottom?.length === 2) { // 받침에 넣을 수 없음
							change += now;
							step = KoState.mid;
						} else if (bottom?.length === 1) { // 기존 받침이 하나 있음
							// 이중 받침 확인
							const consonant = this.map.get(prev + c);
							if (consonant) { // 이중 받침 가능 - 적용
								change = change.substring(0, change.length - 1);
								change += consonant;
								// step = KoState.top;
							} else { // 이중 받침 불가 - 그대로
								change += now;
								step = KoState.mid;
							}
						} else { 
							change += now;
							step = KoState.mid;
						}
					} else if (step === KoState.mid) { // 그대로
						change += now;
						// step = KoState.mid;
					} else { // 받침
						// TODO: 받침이 불가능한 경우 고려 필요
						const consonant = this.map.get(c + '_');
						if (consonant) { // 받침 가능 - 적용
							change += consonant;
							step = KoState.top;
						} else { // 받침 적용 불가 - 초성으로 적용
							change += now;
							step = KoState.mid;
						}
					}
				}
			} else { // 이외 문자
				// 기존 문자 그대로 유지
				change += c;
				step = KoState.top;
			}
			prev = c;
		}
		let nWord = change.normalize('NFC');
		for (const chr of nWord) {
			const n = this.nfcMap.get(chr);
			if (n) {
				nWord = nWord.replace(chr, n);
			}
		}
		return nWord;
	}

	// 마지막 문자의 받침을 분리하여 반환
	private getLastBottom(str: string): string[] | null {
		const last = str.slice(-1).normalize('NFKD');
		const bottom = last.slice(-1);
		const code = bottom.charCodeAt(0);
		if (0x11A8 <= code && code <= 0x11C2) {
			const alpha = this.map.get(bottom) ?? "";
			if (alpha.length > 1) {
				return [this.map.get(alpha[0] + '_') ?? "", this.map.get(alpha[1]) ?? ""];
			}
			return [this.map.get(alpha[0]) ?? ""];
		}
		return null;
	}
}
const conversion = new Conversion();

// 한영 변환 code action 클래스
export class ConversionAction implements vscode.CodeActionProvider {
	// code action 종류
	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];

	lang: Lang;

	constructor(lang: Lang = Lang.all) {
		this.lang = lang;
	}

	// code action
	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
		const [wordRange, convWord] = conversion.convert(document, range, this.lang);
		const replaceWordFix = this.makeConvFix(document, wordRange, convWord);
		return [
			replaceWordFix,
		];
	}
	// 교체할 단어로 수정하는 함수
	private makeConvFix(document: vscode.TextDocument, range: vscode.Range, convWord: string): vscode.CodeAction {
		let msg = localize("action.title", "한영 변환");
		if (this.lang === Lang.ko) {
			msg = localize("action.korean","변환 영->한");
		}
		if (this.lang === Lang.en) {
			msg = localize("action.english", "변환 한->영");
		}
		if (vscode.workspace.getConfiguration("ko-en-conversion").command.action.preview ?? true) {
			msg += `\n (${convWord})`;
		}
		const fix = new vscode.CodeAction(msg, vscode.CodeActionKind.QuickFix);
		fix.edit = new vscode.WorkspaceEdit();
		fix.edit.replace(document.uri, range, convWord);
		return fix;
	}

}

export function deactivate() { }
