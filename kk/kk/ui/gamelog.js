/**
 * @author 강예형
 * 인터페이스에서 기록(log) 부분을 담당하는 object.
 */

/* global $ */
var ui = ui || {};

ui.gamelog = (function() {
    var $gamelog = '#gamelog';

    /**
     * 주어진 문자열(str)을 한 줄의 메시지로 출력한다.
     * 다음과 같은 특수 코드를 사용 시 특수 코드 뒤에 오는 글자의 색깔이 변한다.
     * 주의사항: str에 HTML 코드를 넣으면 일반 텍스트로 출력됨!
     * 
     * - [[normal]]   : 기본값. 일반적인 텍스트 색깔로 출력된다.
     * - [[info]]     : 중요한 정보를 나타낼 경우
     * - [[warning]]  : 경고 메시지
     * - [[critical]] : 치명적인 경고나 사망 등의 메시지
     * - [[error]]    : 오류 메시지
     *  
     * @example
     *    ui.gamelog.print("Hello, world");
     *    ui.gamelog.print("[[warning]]음식을 오랫동안 먹지 않아 배가 고픕니다.");
     *    ui.gamelog.print("상자를 열어 [[info]]축복받은 방패[[normal]]을 발견했습니다.");
     */
    function print(str) {
        $gamelog = $($gamelog);
        console.assert($gamelog.length > 0, '게임 로그를 출력할 DIV를 찾을 수 없습니다.');

        var $entry = $('<div class="gamelog__entry">').appendTo($gamelog);

        //str에 HTML 코드가 있으면 일반 텍스트로 변환한다.
        str = str.replace(/[<>]/g, function(char) {
            switch (char) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                default:  return char;
            }
        });

        //특수 코드를 CSS 클래스가 가미된 SPAN 태그로 변환
        var specialCodes = /\[\[(normal|info|warning|critical|error)\]\]/g;
        str = str.replace(specialCodes, '</span><span class="gamelog__entry--$1">');

        //HTML 주입(시작과 끝을 SPAN 태그로 감싸준다)
        $entry.html('<span>' + str + '</span>');

        //마지막 줄(방금 출력한 줄)로 스크롤 위치 이동
        $gamelog.scrollTop($gamelog.prop('scrollHeight'));
    }

    /**
     * gamelog.print()의 printf 버전
     * 사용법은 rot.js에서 제공하는 String.format과 동일함.
     * 
     * @example
     *    gamelog.print('레벨 %s 달성', level);
     *    gamelog.print('%을 먹었습니다.', item);
     */
    function printf() {
        print(String.format.apply(String, arguments));
    }


    return {
        print: print,
        printf: printf
    };

})();
