export const fakeShares = [
    {
        id:'1',
        type:'file',
        name:'中国移动研发项目结题报告-甄维学.doc',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/',
        tags:['test']
    },
    {
        id:'2',
        type:'file',
        name:'转发：美国签证面试办理流程.zip',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/',
        tags:['test']
    },
    {
        id:'3',
        type:'file',
        name:'项目管理知识体系指南第五版 中文版.pdf',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/',
        tags:['test']
    },
    {
        id:'4',
        type:'file',
        name:'SUN_FEI行程单.doc',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/',
        tags:['test']
    },
    {
        id:'5',
        type:'file',
        name:'Virtual Machines.doc',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/科学素养',
        tags:['test']
    },
    {
        id:'6',
        type:'file',
        name:'Lua程序设计第二版.pdf',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/科学素养',
        tags:['test']
    },
    {
        id:'7',
        type:'file',
        name:'Lua中文教程.pdf',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/课外',
        tags:['test']
    },
    {
        id:'8',
        type:'file',
        name:'Lua中文教程.pdf',
        author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
        date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleDateString(),
        size:(Math.random()*10).toString().slice(0,4),
        dir:'/修身养性/德治篇',
        tags:['课外']
    }
];

export const fakeProjects = [
    {key:1,value:"陕甘南雪莲花项目",status:'active'},
    {key:2,value:"南非野生动物保护项目",status:'active'},
    {key:3,value:"洪湖里拆迁改造项目",status:'closed'},
    {key:4,value:"克丝菲尔专利纠纷案",status:'active'},];
