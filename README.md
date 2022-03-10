# Ko-En conversion - VS Code Extension

Visual Studio Code 한영 변환 도구  
Korean-English conversion tool for VS code

## 기능 (Features)

한/영 키를 누르지 않고 한글을 영어로 영어를 한글로 작성한 경우가 있나요?  
입력한 내용을 모두 지우고 다시 작성하지 않도록 한영 변환 도구가 도와드립니다.  
  
\!\[이미지\]\(images/feature-x.png\)

## 확장 설정 (Extension Settings)

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## 알려진 문제 (Known Issues)

[이슈 바로가기](https://github.com/LeeSeungYun1020/vscode-ko-en-conversion/issues)

## 출시 노트 (Release Notes)

### 0.1.2

설정 추가
- 메뉴 표시 설정 추가
- 코드 액션 표시 설정 추가
- 변환 대상 언어 설정 추가

### 0.1.1

영어 -> 한글 변환 기능 개선 알림 추가
영어에서 한글로 변환을 시도할 경우 알림을 표시합니다.
- 영어 - 한글 변환 개발 중 알림 표시
- 잘못된 변환 규칙 일시 미적용

### 0.1.0

한글 -> 영어 변환 기능 제공  
이제 한글로 잘못 입력한 영어 입력을 즉시 영어로 변환할 수 있습니다.
- 코드 액션을 통해 변환을 수행할 수 있습니다.
- 메뉴를 통해 변환을 수행할 수 있습니다.
