/**
 * @author 강예형
 * 아이템의 템플릿(실제 아이템 객체를 찍어내기 위한 설정값)을 지정한다.
 */

'use strict';

/**
 * 아이템의 템플릿(기본 속성)을 모아놓은 object.
 * ex) item.sword에는 칼의 기본 속성이 저장되어 있다.
 * 
 * 아이템 템플릿에는 다음의 정보가 저장되어 있다.
 * - code: 아이템의 종류를 구분하는 고유한 문자열
 * - name: 아이템의 이름
 * - desc: 아이템의 설명 문자열
 * - image: 인벤토리에서 아이템을 나타내는 이미지의 이름(images/items/에 들어있음)
*/

var items = {

  all:      [], //모든 아이템의 기본 속성이 들어있는 배열(랜덤하게 아이템 생성 시 필요)
  weapons:  [], //모든 무기의 기본 속성이 들어있는 배열
  food:     [], //모든 식량의 기본 속성이 들어있는 배열
  misc:     [], //모든 기타 아이템의 기본 속성이 들어있는 배열


  //-------- 무기 --------//

  axe: {
    type: 'weapon',
    name: '도끼',
    eul:  '를',
    desc: '무겁지만 강한 도끼입니다.',
    symbol: '\\',
    damage: 10
  },
  hammer: {
    type: 'weapon',
    name: '망치',
    eul:  '를',
    desc: '무겁지만 강한 망치입니다.',
    symbol: '\\',
    damage: 10
  },
  knife: {
    type: 'weapon',
    name: '단검',
    eul:  '을',
    desc: '작고 가볍지만 빠른 무기입니다.',
    symbol: '|',
    damage: 4
  },
  pickaxe: {
    type: 'weapon',
    name: '곡괭이',
    eul:  '를',
    desc: '군인의 보조 무기라고 합니다.',
    symbol: '\\',
    damage: 15
  },
  shovel: {
    type: 'weapon',
    name: '삽',
    eul:  '을',
    desc: '군인의 기본 무기라고 합니다.',
    symbol: '\\',
    damage: 10
  },
  spear: {
    type: 'weapon',
    name: '창',
    eul:  '을',
    desc: '너도! 나도! 한 방!',
    symbol: '/',
    damage: 20
  },
  sword: {
    type: 'weapon',
    name: '검',
    eul:  '을',
    desc: '많은 사람들은 검을 기본 무기로 선호합니다.',
    symbol: '|',
    damage: 5
  },

  //-------- 식량 --------//

  apple: {
    type: 'food',
    name: '사과',
    eul:  '를',
    desc: '맛있는 사과입니다.',
    symbol: ',',
    fullness: 50
  },
  bread: {
    type: 'food',
    name: '빵',
    eul:  '을',
    desc: '구운 지 한참 되어 눅눅해진 빵입니다.',
    symbol: ',',
    fullness: 100
  },
  cookie: {
    type: 'food',
    name: '쿠키',
    eul:  '를',
    desc: '초콜릿 칩이 박혀 있는 과자입니다.',
    symbol: ',',
    fullness: 50
  },
  lunchbag: {
    type: 'food',
    name: '도시락',
    eul:  '을',
    desc: '배를 든든하게 채워 줄 도시락입니다.',
    symbol: ',',
    fullness: 300
  },
  meat: {
    type: 'food',
    name: '고기',
    eul:  '를',
    desc: '맛있고 소화 잘되는 고기입니다.',
    symbol: ',',
    fullness: 150
  },
  milk: {
    type: 'food',
    name: '우유',
    eul:  '를',
    desc: '아침 쾌변을 도와주는 우유입니다.',
    symbol: ',',
    fullness: 50
  },
  sandwich: {
    type: 'food',
    name: '샌드위치',
    eul:  '를',
    desc: '햄과 치즈, 삶은 계란으로 만든 샌드위치입니다.',
    symbol: ',',
    fullness: 100
  },
  tuna_can: {
    type: 'food',
    name: '참치 통조림',
    eul:  '을',
    desc: '뚜껑을 손으로 딸 수 있는 참치 통조림입니다.',
    symbol: ',',
    fullness: 100
  },

  //-------- 기타 아이템 --------//

  krystal: {
    type: 'misc',
    name: '쿨롱 크리스탈',
    eul:  '을',
    desc: '지하 세계에서 살아가는 데 필요한 동력원입니다. 소모하여 특수한 기술을 사용할 수 있습니다.',
    symbol: '*'
  },
  bigkrystal: {
    type: 'misc',
    name: '커다란 쿨롱 크리스탈',
    eul:  '을',
    desc: '쿨롱 크리스탈 두 개를 뭉쳐서 만든 커다란 크리스탈입니다.',
    symbol: '*'
  },
  battery: {
    type: 'misc',
    name: '쿨롱 배터리',
    eul:  '를',
    desc: '쿨롱 크리스탈을 액체 형태로 보관할 수 있는 휴대용 배터리입니다.',
    symbol: '%'
  },
  crown: {
    type: 'misc',
    name: '왕관',
    eul:  '을',
    desc: '누가 쓰던 것일까요?',
    symbol: ']'
  },
  flute: {
    type: 'misc',
    name: '피리',
    eul:  '를',
    desc: '초등학생 시절 누구나 불어봤을 법한 리코더입니다.',
    symbol: '-'
  },
  gem: {
    type: 'misc',
    name: '보석',
    eul:  '을',
    desc: '반짝이는 보석입니다.',
    symbol: '$'
  },
  potion: {
    type: 'misc',
    name: '물약',
    eul:  '을',
    desc: '물약입니다.',
    symbol: '!'
  },
  scroll: {
    type: 'misc',
    name: '두루마리',
    eul:  '를',
    desc: '두루마리입니다.',
    symbol: '?'
  },
  torch: {
    type: 'misc',
    name: '횃불',
    eul:  '을',
    desc: '어둠을 밝히는 도구입니다.',
    symbol: '~'
  },
  trophy: {
    type: 'misc',
    name: '트로피',
    eul:  '를',
    desc: '축하합니다! 게임을 모두 깬 기념품입니다.',
    symbol: '"'
  },
  trumpet: {
    type: 'misc',
    name: '나팔',
    eul:  '을',
    desc: '시끄러운 소리가 나는 나팔입니다.',
    symbol: '~'
  },
  violin: {
    type: 'misc',
    name: '바이올린',
    eul:  '을',
    desc: '바이올린입니다.',
    symbol: '~'
  },
  wand: {
    type: 'misc',
    name: '요술지팡이',
    eul:  '를',
    desc: '마법을 쓸 수 있는 도구입니다.',
    symbol: '-'
  }
};


//아이템의 이미지 URL 설정 및 배열에 저장
(function () {
  for (var itemCode in items) {
    //items.all은 아이템이 아니라 배열이므로 처리하지 않는다
    if (Array.isArray(items[itemCode]))
      continue;
  
    var item = items[itemCode];
    item.code = itemCode;
  
    if (!item.imageName)
      item.imageName = itemCode + '.png';
  
  
    //items.all에 이 아이템 속성을 추가한다
    items.all.push(item);
  
    //items.weapons/food/misc에 이 아이템 속성을 추가한다.
    var itemCategory;
    if (item.type === 'weapon')
      itemCategory = 'weapons';
    else
      itemCategory = item.type;
  
    items[itemCategory].push(item);
  }
})();
