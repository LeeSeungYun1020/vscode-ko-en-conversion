// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"ko-en-conversion" is now active!');

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('markdown', new ConversionAction(), {
			providedCodeActionKinds: ConversionAction.providedCodeActionKinds
		})
	);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ko-en-conversion.conversion', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Ko-En conversion!');
	});

	context.subscriptions.push(disposable);
}

// 한영 변환 code action 클래스
export class ConversionAction implements vscode.CodeActionProvider {

	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];

	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
		const first = range.start.character;
		const last = range.end.character;
		const text = document.lineAt(range.start.line).text;

		let word = text.substring(first, last);
		if (range.isEmpty) {
			word = this.selectWord(text, first, last);
		}
		console.log(word);

		const [isKo, isEn, isOther] = this.checkLang(word);
		console.log(`ko:${isKo} en:${isEn} other:${isOther}`);
		return [];
	}

	private selectWord(text: string, first: number, last: number): string {
		if (text[first] === ' ') {
			first--;
		}
		while (first >= 0 && text[first] !== ' ') {
			first--;
		}
		while (last < text.length && text[last] !== ' ') {
			last++;
		}
		return text.substring(first + 1, last);
	}

	private checkLang(text: string) {
		let isKo = false;
		let isEn = false;
		let isOther = false;
		for (const t of text) {
			const unicode = t.charCodeAt(0);
			if (0xAC00 <= unicode && unicode <= 0xD7AF) {
				isKo = true;
			} else if (65 <= unicode && unicode <= 90 || 97 <= unicode && unicode <= 122) {
				isEn = true;
			} else {
				isOther = true;
			}
			console.log(`${t} -> ${unicode} ko:${isKo} en:${isEn} other:${isOther}`);
		}
		return [isKo, isEn, isOther];
	}

}

// this method is called when your extension is deactivated
export function deactivate() { }
