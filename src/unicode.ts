export function getKoMap(): Map<string, string> {
    const koMap: Map<string, string> = new Map([
        // U+1100 ~ U+11FF
        ["ᄀ", "r"],
        ["ᄁ", "R"],
        ["ᄂ", "s"],
        ["ᄃ", "e"],
        ["ᄄ", "E"],
        ["ᄅ", "f"],
        ["ᄆ", "a"],
        ["ᄇ", "q"],
        ["ᄈ", "Q"],
        ["ᄉ", "t"],
        ["ᄊ", "T"],
        ["ᄋ", "d"],
        ["ᄌ", "w"],
        ["ᄍ", "W"],
        ["ᄎ", "c"],
        ["ᄏ", "z"],
        ["ᄐ", "x"],
        ["ᄑ", "v"],
        ["ᄒ", "g"],
        ["ᄓ", "sr"],
        ["ᄔ", "ss"],
        ["ᄕ", "se"],
        ["ᄖ", "sq"],
        ["ᄗ", "er"],
        ["ᄘ", "fs"],
        ["ᄙ", "ff"],
        ["ᄚ", "fg"],
        ["ᄛ", "fd"],
        ["ᄜ", "aq"],
        ["ᄝ", "ad"],
        ["ᄞ", "qr"],
        ["ᄟ", "qs"],
        ["ᄠ", "qe"],
        ["ᄡ", "qt"],
        ["ᄢ", "qtr"],
        ["ᄣ", "qte"],
        ["ᄤ", "qtq"],
        ["ᄥ", "qtt"],
        ["ᄦ", "qtw"],
        ["ᄧ", "qw"],
        ["ᄨ", "qc"],
        ["ᄩ", "qx"],
        ["ᄪ", "qv"],
        ["ᄫ", "qd"],
        ["ᄬ", "qqd"],
        ["ᄭ", "tr"],
        ["ᄮ", "ts"],
        ["ᄯ", "te"],
        ["ᄰ", "tf"],
        ["ᄱ", "ta"],
        ["ᄲ", "tq"],
        ["ᄳ", "tqr"],
        ["ᄴ", "ttt"],
        ["ᄵ", "td"],
        ["ᄶ", "tw"],
        ["ᄷ", "tc"],
        ["ᄸ", "tz"],
        ["ᄹ", "tx"],
        ["ᄺ", "tv"],
        ["ᄻ", "tg"],
        ["ᄼ", "t"],
        ["ᄽ", "tt"],
        ["ᄾ", "t"],
        ["ᄿ", "tt"],
        ["ᅀ", "t"],
        ["ᅁ", "dr"],
        ["ᅂ", "de"],
        ["ᅃ", "da"],
        ["ᅄ", "dq"],
        ["ᅅ", "dt"],
        ["ᅆ", "dt"],
        ["ᅇ", "dd"],
        ["ᅈ", "dw"],
        ["ᅉ", "dc"],
        ["ᅊ", "dx"],
        ["ᅋ", "dv"],
        ["ᅌ", "d"],
        ["ᅍ", "wd"],
        ["ᅎ", "w"],
        ["ᅏ", "ww"],
        ["ᅐ", "w"],
        ["ᅑ", "ww"],
        ["ᅒ", "cz"],
        ["ᅓ", "cg"],
        ["ᅔ", "c"],
        ["ᅕ", "c"],
        ["ᅖ", "vq"],
        ["ᅗ", "vd"],
        ["ᅘ", "gg"],
        ["ᅙ", "g"],
        ["ᅚ", "re"], // ㄱㄷ
        ["ᅛ", "st"], // ㄴㅅ
        ["ᅜ", "sw"], // ㄴㅈ
        ["ᅝ", "sg"], // ㄴㅎ
        ["ᅞ", "ef"], // ㄷㄹ
        ["ᅟ", ""], // 중성 채움 문자
        ["ᅠ", ""],
        ["ᅡ", "k"],
        ["ᅢ", "o"],
        ["ᅣ", "i"],
        ["ᅤ", "O"],
        ["ᅥ", "j"],
        ["ᅦ", "p"],
        ["ᅧ", "u"],
        ["ᅨ", "P"],
        ["ᅩ", "h"],
        ["ᅪ", "hk"],
        ["ᅫ", "ho"],
        ["ᅬ", "hl"],
        ["ᅭ", "y"],
        ["ᅮ", "n"],
        ["ᅯ", "nj"],
        ["ᅰ", "np"],
        ["ᅱ", "nl"],
        ["ᅲ", "b"],
        ["ᅳ", "m"],
        ["ᅴ", "ml"],
        ["ᅵ", "l"],
        ["ᅶ", "hk"],
        ["ᅷ", "nk"],
        ["ᅸ", "hi"],
        ["ᅹ", "yi"],
        ["ᅺ", "hj"],
        ["ᅻ", "nj"],
        ["ᅼ", "mj"],
        ["ᅽ", "hu"],
        ["ᅾ", "nu"],
        ["ᅿ", "hj"],
        ["ᆀ", "hp"],
        ["ᆁ", "hP"],
        ["ᆂ", "hh"],
        ["ᆃ", "hn"],
        ["ᆄ", "yi"],
        ["ᆅ", "yO"],
        ["ᆆ", "yu"],
        ["ᆇ", "yh"],
        ["ᆈ", "yl"],
        ["ᆉ", "nk"],
        ["ᆊ", "no"],
        ["ᆋ", "nj"],
        ["ᆌ", "nP"],
        ["ᆍ", "nn"],
        ["ᆎ", "bk"],
        ["ᆏ", "bj"],
        ["ᆐ", "bp"],
        ["ᆑ", "bu"],
        ["ᆒ", "bP"],
        ["ᆓ", "bn"],
        ["ᆔ", "bl"],
        ["ᆕ", "mn"],
        ["ᆖ", "mm"],
        ["ᆗ", "mln"],
        ["ᆘ", "lk"],
        ["ᆙ", "li"],
        ["ᆚ", "lh"],
        ["ᆛ", "ln"],
        ["ᆜ", "lm"],
        ["ᆝ", "lK"],
        ["ᆞ", "K"],
        ["ᆟ", "jK"],
        ["ᆠ", "Kn"],
        ["ᆡ", "Kl"],
        ["ᆢ", "KK"],
        ["ᆣ", "mk"], //ㅡㅏ
        ["ᆤ", "ni"], // ㅜㅑ
        ["ᆥ", "ui"], // ㅕㅑ
        ["ᆦ", "hi"], //ㅗㅑ
        ["ᆧ", "hO"], //ㅗㅒ
        ["ᆨ", "r"],
        ["ᆩ", "R"],
        ["ᆪ", "rt"],
        ["ᆫ", "s"],
        ["ᆬ", "sw"],
        ["ᆭ", "sg"],
        ["ᆮ", "e"],
        ["ᆯ", "f"],
        ["ᆰ", "fr"],
        ["ᆱ", "fa"],
        ["ᆲ", "fq"],
        ["ᆳ", "ft"],
        ["ᆴ", "fx"],
        ["ᆵ", "fv"],
        ["ᆶ", "fg"],
        ["ᆷ", "a"],
        ["ᆸ", "q"],
        ["ᆹ", "qt"],
        ["ᆺ", "t"],
        ["ᆻ", "T"],
        ["ᆼ", "d"],
        ["ᆽ", "w"],
        ["ᆾ", "c"],
        ["ᆿ", "z"],
        ["ᇀ", "x"],
        ["ᇁ", "v"],
        ["ᇂ", "g"],
        ["ᇃ", "rf"],
        ["ᇄ", "rtr"],
        ["ᇅ", "sr"],
        ["ᇆ", "se"],
        ["ᇇ", "st"],
        ["ᇈ", "sA"],
        ["ᇉ", "sx"],
        ["ᇊ", "er"],
        ["ᇋ", "ef"],
        ["ᇌ", "frt"],
        ["ᇍ", "fs"],
        ["ᇎ", "fe"],
        ["ᇏ", "feg"],
        ["ᇐ", "ff"],
        ["ᇑ", "far"],
        ["ᇒ", "fat"],
        ["ᇓ", "fqt"],
        ["ᇔ", "fqg"],
        ["ᇕ", "fqd"],
        ["ᇖ", "ftt"],
        ["ᇗ", "fA"],
        ["ᇘ", "fz"],
        ["ᇙ", "fg"],
        ["ᇚ", "ar"],
        ["ᇛ", "af"],
        ["ᇜ", "aq"],
        ["ᇝ", "at"],
        ["ᇞ", "att"],
        ["ᇟ", "aA"],
        ["ᇠ", "ac"],
        ["ᇡ", "ag"],
        ["ᇢ", "ad"],
        ["ᇣ", "qf"],
        ["ᇤ", "qv"],
        ["ᇥ", "qg"],
        ["ᇦ", "qd"],
        ["ᇧ", "tr"],
        ["ᇨ", "te"],
        ["ᇩ", "tf"],
        ["ᇪ", "tq"],
        ["ᇫ", "A"],
        ["ᇬ", "dr"],
        ["ᇭ", "drr"],
        ["ᇮ", "dd"],
        ["ᇯ", "dz"],
        ["ᇰ", "d"],
        ["ᇱ", "dt"],
        ["ᇲ", "dA"],
        ["ᇳ", "vq"],
        ["ᇴ", "vd"],
        ["ᇵ", "gs"],
        ["ᇶ", "gf"],
        ["ᇷ", "ga"],
        ["ᇸ", "gq"],
        ["ᇹ", "md"],
        ["ᇺ", "rs"],
        ["ᇻ", "rq"],
        ["ᇼ", "rc"],
        ["ᇽ", "rz"],
        ["ᇾ", "rg"],
        ["ᇿ", "ss"],



        // U+3131 ~ U+318E
        ["ㄱ", "r"],
        ["ㄲ", "R"],
        ["ㄳ", "rt"],
        ["ㄴ", "s"],
        ["ㄵ", "sw"],
        ["ㄶ", "sg"],
        ["ㄷ", "e"],
        ["ㄸ", "E"],
        ["ㄹ", "f"],
        ["ㄺ", "fr"],
        ["ㄻ", "fa"],
        ["ㄼ", "fq"],
        ["ㄽ", "ft"],
        ["ㄾ", "fx"],
        ["ㄿ", "fv"],
        ["ㅀ", "fg"],
        ["ㅁ", "a"],
        ["ㅂ", "q"],
        ["ㅃ", "Q"],
        ["ㅄ", "qt"],
        ["ㅅ", "t"],
        ["ㅆ", "T"],
        ["ㅇ", "d"],
        ["ㅈ", "w"],
        ["ㅉ", "W"],
        ["ㅊ", "c"],
        ["ㅋ", "z"],
        ["ㅌ", "x"],
        ["ㅍ", "v"],
        ["ㅎ", "g"],
        ["ㅏ", "k"],
        ["ㅐ", "o"],
        ["ㅑ", "i"],
        ["ㅒ", "O"],
        ["ㅓ", "j"],
        ["ㅔ", "p"],
        ["ㅕ", "u"],
        ["ㅖ", "P"],
        ["ㅗ", "h"],
        ["ㅘ", "hk"],
        ["ㅙ", "ho"],
        ["ㅚ", "hl"],
        ["ㅛ", "y"],
        ["ㅜ", "n"],
        ["ㅝ", "nj"],
        ["ㅞ", "np"],
        ["ㅟ", "nl"],
        ["ㅠ", "b"],
        ["ㅡ", "m"],
        ["ㅢ", "ml"],
        ["ㅣ", "l"],
        ["ㅤ", ""],// 한글 필러
        ["ㅥ", "ss"],
        ["ㅦ", "se"],
        ["ㅧ", "st"],
        ["ㅨ", "sA"],
        ["ㅩ", "frt"],
        ["ㅪ", "fe"],
        ["ㅫ", "fqt"],
        ["ㅬ", "fA"],
        ["ㅭ", "fG"],
        ["ㅮ", "aq"],
        ["ㅯ", "at"],
        ["ㅰ", "aA"],
        ["ㅱ", "ad"],
        ["ㅲ", "qr"],
        ["ㅳ", "qe"],
        ["ㅴ", "qtr"],
        ["ㅵ", "qte"],
        ["ㅶ", "qw"],
        ["ㅷ", "qx"],
        ["ㅸ", "qd"],
        ["ㅹ", "Qd"],
        ["ㅺ", "tr"],
        ["ㅻ", "ts"],
        ["ㅼ", "te"],
        ["ㅽ", "tq"],
        ["ㅾ", "tw"],
        ["ㅿ", "A"],
        ["ㆀ", "dd"],
        ["ㆁ", "d"],
        ["ㆂ", "dt"],
        ["ㆃ", "dA"],
        ["ㆄ", "vd"],
        ["ㆅ", "gg"],
        ["ㆆ", "G"],
        ["ㆇ", "yi"],
        ["ㆈ", "yO"],
        ["ㆉ", "yl"],
        ["ㆊ", "bu"],
        ["ㆋ", "bP"],
        ["ㆌ", "bl"],
        ["ㆍ", "K"],
        ["ㆎ", "Kl"],
    ]);
    return koMap;
}