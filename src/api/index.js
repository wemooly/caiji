import ajax from "./axios"

// -------------------------------------------登录注册相关------------------------------------

// 用户登录的接口
export const reqLogin = (data) => ajax("/user/login", data);

// 用户注册的接口
export const reqRegister = (data) => ajax("/user/register", data);
/* 
    用户登出接口
*/
export const reqLogout = data => ajax("/user/logout")
// -------------------------------------------项目信息相关-------------------------------------

//项目下 获取所有用户的接口
export const reqAllUser = () => ajax("/user/selectAll")
//项目下 已有权限的的用户接口
export const reqHasUser = data => ajax("/user/selectByProjectId", data)

//获取用户可见项目的接口   //前提要给项目指定了用户  项目才能显示在用户下   后台根据token解析 不用传userId 
export const reqGetProjectList = () => ajax("/project/selectByUserId")
//新增项目
export const reqAddProject = (data) => ajax("/project/insertProject", data)
//为项目指派用户的接口 
export const reqAssignUser = (data) => ajax("/project/assignerUser", data)
// 查看项目信息的接口 (没用到)
export const reqProjectInfo = data => ajax("/project/selectByProjectId", data)


// -------------------------------------------数据源信息相关-------------------------------------

//新增数据源的接口
export const reqAddSource = data => ajax("/dataSource/insertDataSource", data)
// 新增数据源 连接测试  通过了再调新增数据源接口
export const reqLInkTest = data => ajax("/dataSource/linkTest", data)
//修改数据源的接口   
export const reqUpdateSource = data => ajax("/dataSource/updateDataSource", data)
//删除数据源的接口    
export const reqDeleteDataSource = data => ajax("/dataSource/deleteDataSource", data)

//查看数据源信息接口 
export const reqDataSourceInfo = data => ajax("/dataSource/selectBySourceId", data)
// 查看项目下数据源列表
export const reqDataSource = data => ajax("/dataSource/selectByProjectId", data)



// -------------------------------------------数据目的地信息相关-------------------------------------

// 新增数据目的地
export const reqAddDestination = data => ajax("/dataDestination/insertDataDestination", data)
// 项目下数据目的地列表  
export const reqDataDestination = data => ajax("/dataDestination/selectByProjectId", data)
// 查看数据目的地 信息  
export const reqDataDestinationInfo = data => ajax("/dataDestination/selectByDestinationId", data)
// 新增目的地 连接测试
export const reqDisLinkTest = data => ajax("/dataDestination/linkTest", data)

// -------------------------------------------作业信息相关-------------------------------------

// 新增作业接口  
export const reqAddEjob = data => ajax("/ejob/insertEjob", data)
// 修改作业接口 
export const reqUpdateEjob = data => ajax("/ejob/updateEjob", data)
// 删除作业的接口 
export const reqDeleteEjob = data => ajax("/ejob/deleteEjob", data)
// 查看作业信息接口 
export const reqEjobInfo = data => ajax("/ejob/selectByEjobId", data)
// 项目下作业列表   
export const reqEjobs = data => ajax("/ejob/selectByProjectId", data)
// 开始作业接口 
export const reqRunEjob = data => ajax("/ejob/runEjob", data)
// 暂停作业接口  
export const reqSuspendEjob = data => ajax("/ejob/suspendEjob", data)
// 激活作业接口 
export const reqActivateEjob = data => ajax("/ejob/activateEjob", data)

// 作业运行状态/ejob/totalRunInfo
export const reqTotalRunInfo = data => ajax("/ejob/totalRunInfo", data)

// 作业下任务详情列表/etaskBoard/selectByEjobId
export const reqEtaskBoard = data => ajax("/etaskBoard/selectByEjobId", data)

// 作业操作记录列表  
export const reqEjobOperateLog = data => ajax("/ejobOperateLog/selectByEjobId", data)
// 新增作业操作记录
export const reqInsertEjobOperateLog = data => ajax("/ejobOperateLog/insertEjobOperateLog", data);

// -------------------------------------------任务信息相关-------------------------------------

// 新增任务接口 
export const reqAddEtask = data => ajax("/etask/insertEtask", data)
// 修改任务接口  
export const reqUpdateEtask = data => ajax("/etask/updateEtask", data)
// 删除任务接口  
export const reqDeleteEtask = data => ajax("/etask/deleteEtask", data)
// 查看任务信息  
export const reqEtaskInfo = data => ajax("/etask/selectByEtaskId", data)
// 作业下任务列表
export const reqEtasks = data => ajax("/etask/selectByEjobId", data)

// 获取 数据同步任务清单
export const reqGetEtaskList = data => ajax("/etask/getEtaskList", data)

// 保存数据同步任务清单 
export const reqSaveEtaskList = data => ajax("/etask/saveEtaskList", data)

// -------------------------------------------任务规则信息相关-------------------------------------
// 新增规则 
export const reqAddEtaskRule = data => ajax("/etaskRule/insertEtaskRule", data)
// 修改规则 
export const reqUpdateEtaskRule = data => ajax("/etaskRule/updateEtaskRule", data)
// 查看规则信息  
export const reqEtaskRuleInfo = data => ajax("/etaskRule/selectByRuleId", data)
// 任务下规则列表 
export const reqEtaskRules = data => ajax("/etaskRule/selectByEtaskId", data)
