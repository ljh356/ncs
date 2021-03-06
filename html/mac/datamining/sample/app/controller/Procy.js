Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List','common.AddWin','common.DownWin'],
    servicecode:'',
    servicename:'',
    mac:'',
    apname:'',
    apmac:'',
    ssid:'',
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'',
  
    init: function() {
        this.control({
          'authloglist':{
  //         select: this.showTab,
            render: this.showRender
          },
          //关键字查询
          'authloglist button[action=keycx]':{
                click: this.keycx
          },
          //高级查询
          'authloglist button[action=add]':{
                click: this.add
          },
          'addwin button[action=adds]':{
                click: this.adds
          },
          
          'authloglist button[action=del]':{
                click: this.del
          },
          'authloglist button[action=exp]':{
                click: this.exp
          },
          'authloglist button[action=active]':{
                click: this.active
          },
           'authloglist button[action=disable]':{
                click: this.disable
          },
          'authloglist button[action=help]':{
                click: this.help
          },
          //编辑
          'upwin button[action=edit]':{
                click: this.edit
          }

        });
    },
    
    showRender: function(){
        var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
        store.on('beforeload', function (store, options) {
        //调整视图高度
        var qgrid=Ext.ComponentQuery.query('authloglist')[0];
    	  parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
        qgrid.setHeight(parseInt(parent.grid_height)+25);
        	
            var keyword = Ext.getCmp('keyword').value;
            var statway = Ext.getCmp('statway').value;
       
            var new_params={keyword:keyword,statway:statway};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });

        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
    help:function  (thisBtn) {
    	Ext.Msg.alert("提示","请输入MAC地址，格式XX-XX-XX-XX-XX-XX，以';'分隔");
    },
      edit:function(thisBtn){
      
       var taskname = Ext.getCmp('taskname').value;
         var taskdesc = Ext.getCmp('taskdesc').value;
         //var  mac = Ext.getCmp('mac').value;
         var  macgroups = Ext.getCmp('group').value;
         //var  sdate=Ext.getCmp('sdate').value;
         //var  edate=Ext.getCmp('edate').value;
        
        // var  servcount = Ext.getCmp('servcount').value;
        // var  maccount = Ext.getCmp('maccount').value;
         var cid = Ext.getCmp('cid').value;
        // var startdate = new Date(sdate);
        // var starttime = startdate.getTime()/1000;
        // var enddate = new Date(edate);
        //  var endtime = enddate.getTime()/1000 + 86400;
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
    
        tstore.load({params:{edit:"edit",taskname:taskname,taskdesc:taskdesc,cid:cid,macgroups:macgroups}});
          
         var tform=thisBtn.up('window'); 
         tform.close();  
      },
      add:function(thisBtn){
      
         var win = Ext.create('proauthRzAuthlog.view.common.UpdateWin',{
        title: "新建任务",
        field1: ""

      });
      win.showAt(300,20);      
      },
       adds:function(thisBtn){
    
         var taskname = Ext.getCmp('taskname').value;
         var taskdesc = Ext.getCmp('taskdesc').value;
         var  mac = Ext.getCmp('mac').value;
         var  dids = Ext.getCmp('groupname').value;
         var  sdate=Ext.getCmp('sdate').value;
         var  edate=Ext.getCmp('edate').value;
        
         var  servcount = Ext.getCmp('servcount').value;
         var  maccount = Ext.getCmp('maccount').value;
         var startdate = new Date(sdate);
         var starttime = startdate.getTime()/1000;
         var enddate = new Date(edate);
          var endtime = enddate.getTime()/1000 + 86400;
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
      
        tstore.load({params:{add:"add",taskname:taskname,taskdesc:taskdesc,mac:mac,dids:dids,servcount:servcount,
          maccount:maccount,starttime:starttime,endtime:endtime}});
          
         var tform=thisBtn.up('window'); 
         tform.close();
         

      },
      
      
       del:function(thisBtn){
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('cid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('cid') + "'";
             }
           }
           
          tstore.load({params:{del:"del",cid:selsid}});   
      },
       active:function(thisBtn){
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
       var str = '';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('cid') + "'";
           str+=rows[i].get('taskname');
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('cid') + "'";
             }
           }
           if(i>1)
            str+='  等'+i+'个任务将生效';
          else
            str+='  任务生效';
          Ext.MessageBox.confirm('确认', str, function(btn){
            if(btn=='yes')
               tstore.load({params:{update:"0",cid:selsid}});  
          });
       },
       disable:function(thisBtn){
         var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
       var j = 0;
       var str = '';
         for(var i=0;i<rows.length;i++){
          if(i==0){
            str+=rows[i].get('taskname');
           selsid="'" + rows[i].get('cid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('cid') + "'";
             }
           }
             if(i>1)
            str+='  等'+i+'个任务将生效';
          else
            str+='  任务生效';
          Ext.MessageBox.confirm('确认', str, function(btn){
            if(btn=='yes')
               tstore.load({params:{update:"1",cid:selsid}});  
          });
         
       },
       exp:function(thisBtn){
        var form1 = document.getElementById('form1');
        
         form1.keyword.value =  Ext.getCmp('keyword').value;
         form1.statway.value = Ext.getCmp('statway').value;

        form1.exp.value='exp';
        form1.submit();
        form1.exp.value=""; 
      },


      keycx: function(thisBtn){
    	 
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
  
  
    /**************************************
    * 策略标签 
    ***************************************/  
    showTips: function( thisTV, eOpts ){
      thisTV.tip = Ext.create('Ext.tip.ToolTip', {
        target: thisTV.el,
        trackMouse: true,
        dismissDelay : 60000,
        html: '<p>例如：</p><p>&nbsp;&nbsp;&nbsp;单个端口：80,21</p><p>&nbsp;&nbsp;&nbsp;端口段：2000~3000</p><p>&nbsp;&nbsp;&nbsp;组合：80,2000~3000,3005</p>'
      });
    },
    /**************************************
    * 全局函数 
    ***************************************/
    inheritableStatics:{
        loadProcyListStore:function(){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            var keyword = Ext.getCmp('keyword').value;
            
         
            store.load();
        },
        SetPage:function(curpage){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            store.currentPage = curpage;
        },
        setTitle: function(title){
             document.getElementById("titledx").innerHTML = 
                 '&nbsp'+ title +'&nbsp;&nbsp;';   
        }
    }
   
});

