/**
 * @author 강예형
 */

/* global $ */
'use strict';

/**
 * 인자로 주어진 요소 중 이 배열에 포함된 것이 있으면 모두 삭제한다.
 * (기존의 배열을 수정함)
 */
Array.prototype.remove = function () {
  var matchIndex = -1;
  for (var i = 0; i < arguments.length; ++i)
    while ((matchIndex = this.indexOf(arguments[i])) !== -1)
      this.splice(matchIndex, 1);
};

/**
 * rot.js의 String.format을 확장하여 을/를, 이/가, 은/는 등의 한국어 조사를
 * 자동으로 처리한다.
 * 
 * 사용법:
 *    (kimchi.toString() === '김치', kimchi.eul === '를'일 때)
 *    '%{을}'.format(kimchi);   //=> '김치를'
 *    '%{를}'.format(kimchi);   //=> '김치를'
 *    '%{이}'.format(kimchi);   //=> '김치가'
 * 
 *    (terran.toString() === '테란', terran.eul === '을'일 때)
 *    '%{을}'.format(terran);   //=> '테란을'
 *    '%{를}'.format(terran);   //=> '테란을'
 *    '%{이}'.format(terran);   //=> '테란이'
 */

String.format.map = $.extend(String.format.map || {}, {
  '을': 'eulRul',
  '를': 'eulRul',
  '은': 'eunNun',
  '는': 'eunNun',
  '이': 'eeGa',
  '가': 'eeGa'
});
