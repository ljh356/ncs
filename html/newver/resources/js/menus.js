/*
This file is part of Ext JS 4
Copyright (c) 2011 Sencha Inc
Contact:  http://www.sencha.com/contact
GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

Ext.onReady(function(){
    Ext.QuickTips.init();
   
    var menu = Ext.create('Ext.menu.Menu', {
        id: 'mainMenu',
        style: {
            overflow: 'visible'     
        }
        ,
        items: [
          {
                text: '������λ����',        
                handler: onItemClick,
       
           },
           {
           	    text: '��λ�������',
         
                 handler: onItemClick,
           }
        ]
    });

    var menu1 = Ext.create('Ext.menu.Menu', {
        id: 'mainMenu',
        style: {
            overflow: 'visible'     
        },
        items: [
          {
                text: '������λ����',        
                handler: onItemClick,
       
           },
           {
           	    text: '��λ�������',
         
                 handler: onItemClick,
           }
        ]
    });

    var tb = Ext.create('Ext.toolbar.Toolbar');
    tb.suspendLayout = true;
    tb.render('toolbar');

    tb.add(
        {
            text: '������ҳ',
            iconCls: 'book',
            handler:onItemClick
        },'-',
        {
            text:'��λ����',
            iconCls: 'add16',
            handler:onItemClick
        }, '-',
        {
            text: '���ٲ�ѯ',
            iconCls: 'exp',
            handler:onItemClick
        },'-',{
            text: '�鵵��־',
            iconCls: 'viewlist',
            handler:onItemClick
        
      },'-',{
            text: '���ߵ�λ',
            iconCls: 'useradd',
            handler:onItemClick
        
      },'-',{
            text: '������ͳ��',
            iconCls: 'usc',
            handler:onItemClick
        
      },'-',{
            text: '�澯��Ϣ',
            iconCls: 'info',
            handler:onItemClick
        
      },'-', 
         {text:'���ع���',
          iconCls: 'iadd',
          handler:onItemClick
        }, '-',      
         {text:'��ƹ���',
          iconCls: 'fadd',
          handler:onItemClick
        },  '-',     
         {text:'ϵͳ����',
            menu: menu  // assign menu by instance
        },'-'
        ,'->',{
                text: 'ϵͳˢ��',
                iconCls: 'refresh',
                handler: Ext.Function.pass(handleAction, 'Right')
            },'-',{
                text: '�˳�',
                iconCls: 'close',
                handler: Ext.Function.pass(handleAction, 'Right')
            }
        );

    menu.add(' ');

  

    // They can also be referenced by id in or components
    tb.add('-', {
        icon: 'list-items.gif', // icons can also be specified inline
        cls: 'x-btn-icon',
        tooltip: '<b>Quick Tips</b><br/>Icon only button with tooltip',
        handler: function(){
            Ext.example.msg('Button Click','You clicked the "icon only" button.');
        }
    });

   
 

   
    tb.suspendLayout = false;
    tb.doLayout();

    // functions to display feedback
    function onButtonClick(btn){
 //       Ext.example.msg('Button Click','You clicked the "{0}" button.', btn.text);
    }

    function onItemClick(item){

    if(item.text=='��λ����'){   		
    	document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/v4/ncs_user_list.htm';  		
    }
    else if(item.text=='������λ����2'){

    }
    else if(item.text=='��λ�����'){
    	 document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/v4/ncs_group_list.htm';
    }
    else if(item.text=='�鵵��־'){
    	 document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/v4/ncs_gdrz_lab.htm';
    }
    else if(item.text=='������ҳ'){
    	 document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/v4/ncs_first_right.htm';
    }
    else if(item.text=='���ߵ�λ'){
    	 document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/main_Online_Mon.htm';
    }
    else if(item.text=='���ع���'){
    	 document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/v4/ncs_case_lab.htm';
    }
    else if(item.text=='������ͳ��'){
    	 document.getElementById("viewframe").contentWindow.document.getElementById("moduleIframe").src='/v4/ncs_onlinestat_list.htm';
    }
 //       Ext.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }





   var handleAction = function(action){
//   	alert(action);
        Ext.example.msg('<b>Action</b>', 'You clicked "' + action + '"');
    };

  

   

});
