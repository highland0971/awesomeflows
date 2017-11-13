import {fakeShares,fakeProjects} from './testData';


class mailEngine{

    constructor(){
        this.dateNodeList = [];
    }

    updateDataNode(){
        this.dateNodeList = this._mockItems();
    }

    getDataNode(limit=100){
        return this.dateNodeList.slice(0,limit);
    }

    _mockItems() {
        // let arrayLength = Math.floor(Math.random() * 20 + 1);
        let arrayLength = 20;
        let randomArray = [];
        for (var i = 0; i < arrayLength; i++)
            randomArray.push(i);

        return randomArray.map((item) => ({
            itemType: ['discuss', 'task', 'share', 'mail'][Math.round(Math.random() * 10) % 4],
            status: ['new', 'rejected', 'complete', 'delayed', 'inaction'][Math.round(Math.random() * 10) % 5],
            author: ['周连双', '徐峥', '高宏', '马致远', '冯小刚'][Math.round(Math.random() * 10) % 5],
            title: [
                'Sennheiser 森海塞尔 HDVA600 台式耳机功率放大器$649（需用码，约￥4489）',
                '促销活动：天猫 Gap官方旗舰店 美式FUN潮促销秋冬新品6折起，10元无门槛、满199-20元、满399-50元',
                'MEDIHEAL 美迪惠尔 碳酸泡泡面膜 10片 *2件188.11元含税直邮，可1元换购10片装面膜（需用码）',
                'R essentiel 男士圆领针织衫 *2件€51.18包直邮（约￥400）',
                'html的textarea中的文字怎么换行显示',
                'docker for windows 在cmd或者powershell进入容器的时候中文不显示',
                'angular4如何循环遍历以下格式的json数据？',
                '腾讯云小程序解决方案为什么将业务服务器和会话服务器分开？',
                'Android Studio 开发 jar 如何将依赖一起打进去',
                '标记变量flag的用法',
                'elementui 比较特殊的需求，请问如何实现？',
                'The server should not respond anything to the client closeSocket was respond too',
                'rebooted to ss-redir noruning',
                'TCP Fastopen (TFO) doesnt work reliably in China Mobile cellular network'
            ][Math.round(Math.random() * 10) % 14],
            datetime: (new Date()).toLocaleDateString(),
            item: item,
        }));
    }
}

export let mailData = new mailEngine();
mailData.updateDataNode();

export let DataItemType ={
    MAIL:'mail',
    TASK:'task',
    SHARE:'share'
}

export let DataItemStatus = {
    NEW:'new',
    DELAYED:'delayed',
    REJECTED:'rejected',
    DONE:'complete',
    ONGOING:'ongoing',

}

function constructShareEntry(type,name,dir,author=null,date=null,size=null,tags=null) {
    // {
    //     id:'7',
    //         type:'file',
    //     name:'Lua中文教程.pdf',
    //     author:['周连双', '徐峥', '李有才', '熊大志', '马稻城'][Math.round(Math.random() * 10) % 5],
    //     date:(new Date(Date.now()+Math.floor(Math.random()*1000000000)*8 * (Math.random()>0.5?1:-1))).toLocaleString(),
    //     size:(Math.random()*10).toString().slice(0,4),
    //     dir:'/课外',
    //     tags:['test']
    // }
    return {'id':dir+'/'+name,type,name,author,date,size,dir,tags};
}

export function getShareDirContents(baseDir) {
    let qualifiedFiles = fakeShares.filter(item => item.dir === baseDir);
    let qualifiedSubDirStr = '';

    //TODO BUGFIX 需要修正目录无文件不显示的问题
    let a = fakeShares.filter(
        item => baseDir !== item.dir && (baseDir === '/' && item.dir.split('/').length === 2 ||
            baseDir !== '/' && (item.dir.startsWith(baseDir) &&item.dir.split('/').length === baseDir.split('/') .length + 1))
        );
    a.forEach(item => {
        console.log(item.dir);
        qualifiedSubDirStr.indexOf(item.dir.split('/').pop())>=0 || (qualifiedSubDirStr += '/'+ item.dir.split('/').pop())});
    qualifiedSubDirStr.split('/').forEach( dir => dir.length>0 && qualifiedFiles.push(constructShareEntry('dir',dir,baseDir)));
    return qualifiedFiles.reverse();
}

export function getMyProjects(activeOnly=false){
    if(activeOnly)
        return fakeProjects.filter(item => item.status==='active');
    else
        return fakeProjects;
}

export function getProjectTasks(projectName) {
    let moment = require('moment');
    let arrayLength = projectName.length;
    let randomArray = [];
    for (var i = 0; i < arrayLength; i++){
        const now = Math.random()>0.5?moment().add(Math.random()*31,'d'):moment().subtract(Math.random()*31,'d');
        const start = now.clone().subtract(Math.random()*2,'d').subtract(Math.random()*24,'h');
        const end = now.clone().add(Math.random()*2,'d').add(Math.random()*24,'h');
        const item = {
            start: start.format( 'M/DD/YYYY HH:mm'),
            end:end.format('M/DD/YYYY HH:mm'),
            id:i,
        }
        randomArray.push(item);
    }

    let tasks = randomArray.map(item => ({
        itemType: DataItemType.TASK,
        status: [DataItemStatus.NEW, DataItemStatus.REJECTED, DataItemStatus.DONE, DataItemStatus.DELAYED, DataItemStatus.ONGOING][Math.round(Math.random() * 10) % 5],
        author: ['周连双', '徐峥', '高宏', '马致远', '冯小刚'][Math.round(Math.random() * 10) % 5],
        text: [
            'Sennheiser 森海塞尔 HDVA600 台式耳机功率放大器$649（需用码，约￥4489）',
            '促销活动：天猫 Gap官方旗舰店 美式FUN潮促销秋冬新品6折起，10元无门槛、满199-20元、满399-50元',
            'MEDIHEAL 美迪惠尔 碳酸泡泡面膜 10片 *2件188.11元含税直邮，可1元换购10片装面膜（需用码）',
            'R essentiel 男士圆领针织衫 *2件€51.18包直邮（约￥400）',
            'html的textarea中的文字怎么换行显示',
            'docker for windows 在cmd或者powershell进入容器的时候中文不显示',
            'angular4如何循环遍历以下格式的json数据？',
            '腾讯云小程序解决方案为什么将业务服务器和会话服务器分开？',
            'Android Studio 开发 jar 如何将依赖一起打进去',
            '标记变量flag的用法',
            'elementui 比较特殊的需求，请问如何实现？',
            'The server should not respond anything to the client closeSocket was respond too',
            'rebooted to ss-redir noruning',
            'TCP Fastopen (TFO) doesnt work reliably in China Mobile cellular network'
        ][Math.round(Math.random() * 10) % 14],
        start_date:item.start,
        end_date:item.end,
        id:item.id,
    }));

    return tasks;
}