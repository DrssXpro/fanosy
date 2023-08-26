const TreeData = [
  {
    id: 1,
    label: '1-节点1',
    disabled: false,
    isActive: false,
    children: [
      {
        id: 2,
        label: '2-节点1',
        disabled: false,
        parentId: 1,
        isActive: false
      },
      {
        id: 3,
        label: '2-节点2',
        disabled: false,
        parentId: 1,
        isActive: false
      },
      {
        id: 4,
        label: '2-节点3',
        disabled: false,
        parentId: 1,
        isActive: false
      }
    ]
  },
  {
    id: 5,
    label: '1-节点2',
    disabled: false,
    isActive: false
  },
  {
    id: 6,
    label: '1-节点3',
    disabled: false,
    isActive: false,
    children: [
      {
        id: 7,
        label: '2-节点1',
        disabled: false,
        isActive: false,
        parentId: 6,
        children: [
          {
            id: 8,
            label: '3-节点1',
            disabled: false,
            isActive: false,
            parentId: 7
          },
          {
            id: 9,
            label: '3-节点2',
            disabled: false,
            isActive: false,
            parentId: 7
          }
        ]
      },
      {
        id: 10,
        label: '2-节点2',
        disabled: false,
        isActive: false,
        parentId: 6,
        children: [
          {
            id: 11,
            label: '3-节点1',
            disabled: false,
            isActive: false,
            parentId: 10
          },
          {
            id: 12,
            label: '3-节点2',
            disabled: false,
            isActive: false,
            parentId: 10
          }
        ]
      }
    ]
  }
];

export { TreeData };
