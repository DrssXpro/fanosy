import { ICategoryItem } from './types';

const LEVEL = [
  '一级类目',
  '二级类目',
  '三级类目',
  '四级类目',
  '五级类目',
  '六级类目',
  '七级类目',
  '八级类目',
  '九级类目',
  '十级类目'
];

const templateData1: ICategoryItem[] = [
  {
    id: 1,
    content: '1-类目1',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 2,
    content: '1-类目2',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 3,
    content: '1-类目3',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 4,
    content: '1-类目4',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 5,
    content: '1-类目4',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 6,
    content: '1-类目4',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 7,
    content: '1-类目4',
    level: 1,
    isMore: null,
    children: []
  },
  {
    id: 8,
    content: '1-类目4',
    level: 1,
    isMore: null,
    children: []
  }
];
const templateData2 = [
  {
    id: 1,
    content: '2-类目1',
    level: 2,
    isMore: null,
    children: []
  },
  {
    id: 2,
    content: '2-类目2',
    level: 2,
    isMore: null,
    children: []
  },
  {
    id: 3,
    content: '2-类目3',
    level: 2,
    isMore: null,
    children: []
  },
  {
    id: 4,
    content: '2-类目4',
    level: 2,
    isMore: null,
    children: []
  }
];
const templateData3 = [
  {
    id: 1,
    content: '3-类目1',
    level: 3,
    isMore: null,
    children: []
  },
  {
    id: 2,
    content: '3-类目2',
    level: 3,
    isMore: null,
    children: []
  },
  {
    id: 3,
    content: '3-类目3',
    level: 3,
    isMore: null,
    children: []
  },
  {
    id: 4,
    content: '3-类目4',
    level: 3,
    isMore: null,
    children: []
  }
];

export { LEVEL, templateData1, templateData2, templateData3 };
