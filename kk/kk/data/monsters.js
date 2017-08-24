/**
 * @author 강예형
 * 몬스터들의 데이터
 */

'use strict';

var monsters = {
  //---- 창고 층의 몬스터 ----//
  
  'lab_rat': {
    name: '실험실 쥐',
    eul:  '를',
    symbol: 'r',
    level : 1,
    hp    : 5,
    damage: 2
  },
  
  'lab_cat': {
    name: '실험실 고양이',
    eul:  '를',
    symbol: 'c',
    level : 2,
    hp    : 10,
    damage: 3
  },
  
  //---- 실험실 층의 몬스터 ----//
  
  'generator': {
    name: '발전기',
    eul:  '를',
    symbol: 'G',
    level : 5,
    hp    : 150,
    damage: 0
  },
  
  'frog': {
    name: '점액개구리',
    eul:  '를',
    symbol: 'f',
    level : 4,
    hp    : 30,
    damage: 9
  },
  
  'cave_month_larva': {
    name: '흙나방 유충',
    eul:  '을',
    symbol: 'l',
    level : 5,
    hp    : 50,
    damage: 4
  },
  
  //---- 동굴 층의 몬스터 ----//
  
  'cave_moth': {
    name: '흙나방',
    eul:  '을',
    symbol: 'M',
    level : 7,
    hp    : 75,
    damage: 9
  },
  
  'evil_roots': {
    name: '식인뿌리',
    eul:  '를',
    symbol: 'y',
    level : 8,
    hp    : 80,
    damage: 12
  },
  
  'giant_earthworm': {
    name: '거대지렁이',
    eul:  '를',
    symbol: 'z',
    level : 8,
    hp    : 50,
    damage: 10
  },
  
  //---- 동굴 층의 몬스터(내려갈 때) ----//
  
  'giant_earthworm_mother': {
    name: '거대지렁이 어미',
    eul:  '를',
    symbol: 'Z',
    level : 11,
    hp    : 100,
    damage: 15
  },
  
  //---- 침수된 실험실 층의 몬스터 ----//
  
  'tadpole': {
    name: '식인올챙이',
    eul:  '를',
    symbol: 'q',
    level : 13,
    hp    : 60,
    damage: 5
  },
  
  'shark': {
    name: '마이크로돈',
    eul:  '을',
    symbol: 'F',
    level : 14,
    hp    : 150,
    damage: 20
  },
  
  //---- 무너진 창고 층의 몬스터 ----//
  
  'mutated': {
    name: '변이체',
    eul:  '를',
    symbol: 'T',
    level : 17,
    hp    : 200,
    damage: 20
  },
  
  'brother': {
    name: '괴물',
    eul:  '을',
    symbol: 'B',
    level : 20,
    hp    : 500,
    damage: 40
  }
};
