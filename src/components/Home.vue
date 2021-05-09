<template>
  <div >
    <loading :active.sync="isLoading"></loading>
    <div >
      <nav class="navbar navbar-expand-lg navbar-light bg-light container">      
      
     
          <form class="form-inline my-2 my-lg-0 ml-auto" v-if="!userName" >    
            <div class="input-group mb-3">
              <input type="text" class="form-control mr-sm-2 mr-1" placeholder="請輸入姓名" v-model="newname" @keyup.enter="addUser">
              <div class="input-group-append">
                <button class="btn btn-primary  my-sm-0 px-4" type="button" @click="addUser">確定</button>
              </div>
            </div>


          </form>
          <form class="form-inline my-2 my-lg-0 ml-auto" v-if="userName" >
            <h3 class="mr-3 mt-2  mr-sm-2">{{userName}}，歡迎回來</h3>
            <button class="btn btn-outline-secondary my-2 my-sm-0 px-4" type="button" @click="Signout">登出</button>
          </form>
        
      </nav>
    </div>
  
    <section class="container px-0" >
      <div class="position-relative overflow-hidden p-3 p-md-5  text-center bg-light">
        <div class="col-md-8 p-lg-5 mx-auto my-3">
          <h1 class="font-weight-normal title-size">𝓣𝓸 𝓓𝓸 𝓛𝓲𝓼𝓽~</h1>
        </div>
        <div  class="text-center my-5" v-if="!userName">        
            <h2 class="">~~~請先輸入姓名~~~</h2>  
            <div class="input-group mb-3" >              
            </div> 
        </div>


        <form >
          <div class="form-row">
            <div class="form-group col-md-4" v-if="userName ">
              <div class="input-group mb-3" >
                <div class="input-group-prepend" >
                  <span class="input-group-text" >完成期限 ：</span>
                </div>
                <select class="form-control" v-model="whatTimetodo">
                  <option disabled value="">請選擇</option>
                  <option>今天</option>
                  <option>明天</option>
                  <option>這禮拜</option>
                  <option>這個月</option>
                </select>
              </div>              
            </div>
            <div class="form-group col-md-8" v-if="userName ">             
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="請輸入任務" v-model="newTodo" @keyup.enter="addTodo">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary px-4" type="button"  @click="addTodo">新增</button> 
                </div>
              </div>            
          </div>
          </div>
        </form>
         <div class="row">
          <div class="col-md-6 py-3 px-2">
            <div class="card h-100">
              <div class="card-header h2 text-danger ">今日待辦事項</div>
              <div class="card-body">
                <ul class="list-group text-left">
                  <li class="list-group-item " v-for="(item,key) in todayFilteredTodos" :key="item.id">
                    <div class="d-flex" v-if="item.id !== cacheTodo.id">
                      <div class="mr-auto">
                        {{key +1 }}. {{item.content}}
                      </div>
                      
                      
                      <button type="button" class="close ml-3 " @click="editTodo(item)" aria-label="Close">
                        <div><i class="fas fa-pencil-alt"></i></div>                     
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                      <button type="button" class="close ml-3" @click="delTodo(item)" aria-label="Close">
                        <div><i class="far fa-trash-alt "></i></div>                      
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                  </div>
                  <input type="text" class="form-control" v-model="cacheTitle" @keyup.esc="cacelEdit()" @keyup.enter="doneEdit(item)" v-if="item.id === cacheTodo.id">
                  </li>
  
                </ul>
              </div>
  
            </div>
          </div>
          <div class="col-md-6 py-3 px-2">
            <div class="card h-100">
              <div class="card-header h2 text-warning ">明日待辦事項</div>
              <div class="card-body">
                <ul class="list-group  text-left">
                  <li class="list-group-item " v-for="(item,key) in tomorrowFilteredTodos" :key="item.id">
                    <div class="d-flex" v-if="item.id !== cacheTodo.id">
                      <div class="mr-auto">
                        {{key +1 }}. {{item.content}}
                      </div>
                      
                      <button type="button" class="close ml-3" @click="editTodo(item)" aria-label="Close">
                        <div><i class="fas fa-pencil-alt"></i></div>                     
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                      <button type="button" class="close ml-3" @click="delTodo(item)" aria-label="Close">
                        <div><i class="far fa-trash-alt "></i></div>                      
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                  </div>
                  <input type="text" class="form-control" v-model="cacheTitle" @keyup.esc="cacelEdit()" @keyup.enter="doneEdit(item)" v-if="item.id === cacheTodo.id">
                  </li>
  
                </ul>
              </div>
  
            </div>
          </div>
          <div class="col-md-6 py-3 px-2">
            <div class="card h-100">
              <div class="card-header h2  text-info ">這週待辦事項</div>
              <div class="card-body">
                <ul class="list-group text-left">
                  <li class="list-group-item " v-for="(item,key) in thisWeekFilteredTodos" :key="item.id">
                    <div class="d-flex" v-if="item.id !== cacheTodo.id">
                      <div class="mr-auto">
                        {{key +1 }}. {{item.content}}
                      </div>
                      
                      <button type="button" class="close ml-3" @click="editTodo(item)" aria-label="Close">
                        <div><i class="fas fa-pencil-alt"></i></div>                     
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                      <button type="button" class="close ml-3" @click="delTodo(item)" aria-label="Close">
                        <div><i class="far fa-trash-alt "></i></div>                      
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                  </div>
                  <input type="text" class="form-control" v-model="cacheTitle" @keyup.esc="cacelEdit()" @keyup.enter="doneEdit(item)" v-if="item.id === cacheTodo.id">
                  </li>
  
                </ul>
              </div>
  
            </div>
          </div>
          <div class="col-md-6 py-3 px-2">
            <div class="card h-100">
              <div class="card-header h2  text-success ">這個月待辦事項</div>
              <div class="card-body">
                <ul class="list-group text-left">
                  <li class="list-group-item " v-for="(item,key) in thisMonthFilteredTodos" :key="item.id">
                    <div class="d-flex" v-if="item.id !== cacheTodo.id">
                      <div class="mr-auto">
                        {{key +1 }}. {{item.content}}
                      </div>
                      
                      <button type="button" class="close ml-3" @click="editTodo(item)" aria-label="Close">
                        <div><i class="fas fa-pencil-alt"></i></div>                     
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                      <button type="button" class="close ml-3" @click="delTodo(item)" aria-label="Close">
                        <div><i class="far fa-trash-alt "></i></div>                      
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                  </div>
                  <input type="text" class="form-control" v-model="cacheTitle" @keyup.esc="cacelEdit()" @keyup.enter="doneEdit(item)" v-if="item.id === cacheTodo.id">
                  </li>
  
                </ul>
              </div>
  
            </div>
          </div>
          
  
          <div class="col-md-12 px-2 py-3">
            <div class="card h-100">
              <div class="card-header h2  text-secondary ">全部的待辦事項</div>
              <div class="card-body">
                <ul class="list-group  text-left">
                  <li class="list-group-item " v-for="(item,key) in totalTodos" :key="item.id">
                    <div class="d-flex" v-if="item.id !== cacheTodo.id">
                      <div class="mr-auto">
                        {{key +1 }}. {{item.content}}
                      </div>
                      
                      <button type="button" class="close ml-3" @click="editTodo(item)" aria-label="Close">
                        <div><i class="fas fa-pencil-alt"></i></div>                     
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                      <button type="button" class="close ml-3" @click="delTodo(item)" aria-label="Close">
                        <div><i class="far fa-trash-alt "></i></div>                      
                        <!-- <span aria-hidden="true">&times;</span>  -->
                      </button>
                  </div>
                  <input type="text" class="form-control" v-model="cacheTitle" @keyup.esc="cacelEdit()" @keyup.enter="doneEdit(item)" v-if="item.id === cacheTodo.id">
                  </li>
  
                </ul>
              </div>
  
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>

   var UserName = JSON.parse(localStorage.getItem('UserName'))||[];
export default {  
  data () {
    return {
      newTodo: '',
        newname:'',
        addnewtodo: {},
        Todo: [],
        whatTimetodo: '',
        cacheTodo:{},
        cacheTitle:'',
        user:[],
        userName:'',
        info: null,
        isLoading: false
    }    
  },
  methods: {
    Signout:function(){
          const vm = this;
          vm.user[0].name = '';
          localStorage.setItem('UserName', JSON.stringify(vm.user));
          UserName = JSON.parse(localStorage.getItem('UserName'));

          window.location.reload()//重新整理
          
        },

        addUser:function(){

          const vm = this;
          var value = vm.newname.trim();
          // console.log(value )

          if(!value){
            return;
          }
          vm.user.push({
            name:value, 
          });
          vm.newname = '';


          localStorage.setItem('UserName', JSON.stringify(vm.user));
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;
          // console.log(vm.userName +'安安')
          
          vm.getTodo();
        },
        
        addTodo: function () {

          const vm = this;
          var value = vm.newTodo.trim();
          console.log(vm.whatTimetodo )
          // if( vm.whatTimetodo ===""){
          //   return;
          // }
          if (!value || vm.whatTimetodo ==="") {
            return;
          };

          vm.addnewtodo = {
            content: value,
            timetodo: vm.whatTimetodo,
          };
          vm.newTodo = '';
          vm.whatTimetodo = '';
          // const api = '127.0.0.1:3000/addTodo';
          
          // console.log(vm.addnewtodo)


          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;     
          const api = `${process.env.APIPATH}/api/${vm.userName}/addTodo`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/addTodo`;
          // console.log(api )
          this.$http.post(api, vm.addnewtodo)
            .then((res) => {
              console.log(res);
              vm.getTodo(); 
            })
            .catch((error) => { console.error(error) })
          
          //  axios.post(api, vm.todos ).then(response => {
          //   console.log(response);
          // });



        },
        getTodo: function () {
          const vm = this;
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name; 
          vm.isLoading= true;         
          const api = `${process.env.APIPATH}/api/${vm.userName}/getTodo`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/getTodo`;
          this.$http.get(api).then(response => {
            // console.log(response.data.list);
            vm.Todo = response.data.list;
            // console.log(vm.Todo )
            vm.isLoading= false;    
            return vm.Todo;

          });
        },
        delTodo: function (item) {
          // console.log(item )
          const vm = this;
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;          
          const api = `${process.env.APIPATH}/api/${vm.userName}/deleteTodo/${item.id}`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/deleteTodo/${item.id}`;
          // console.log(process.env.APIPATH,process.env.CUSTOMPATH)
          this.$http.delete(api).then((response) => {
            // console.log(response.data);
            vm.getTodo(); 
            
          });
        },
        editTodo: function (item){
          const vm = this;
          vm.cacheTodo = item;
          vm.cacheTitle = item.content;          
        },

        doneEdit:function(item){
          const vm = this;
          item.content = vm.cacheTitle;
          vm.cacheTitle = '';
          vm.cacheTodo = {};  
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;          
          const api = `${process.env.APIPATH}/api/${vm.userName}/updataTodo/${item.id}`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/updataTodo/${item.id}`;
          this.$http.put(api, item)
            .then((res) => {
              console.log(res);
              vm.getTodo(); 
            })
            .catch((error) => { console.error(error) })         
        },
        cacelEdit:function(){
          this.cacheTodo = {};
        },
  },
  computed: {
        todayFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.Todo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "今天") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        tomorrowFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.Todo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "明天") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        thisWeekFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.Todo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "這禮拜") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        thisMonthFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.Todo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "這個月") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        totalTodos: function () {    
          const vm = this;      
          return vm.Todo;
        },
  },
  created() {
        const vm = this;
        
        UserName = JSON.parse(localStorage.getItem('UserName'));
        // console.log( UserName )
        if(UserName !=null){
          // console.log(vm.user)
          if( UserName[0].name  ){
            vm.user = UserName;
            vm.userName =vm.user[0].name;
            // console.log(vm.userName)
            vm.getTodo()
          }else{
            // console.log('請先輸入姓名');
            vm.userName='';
          }
        }
        
        // console.log(vm.user)
        
      },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 576px) { 
  .title-size{
      font-size: 5rem;
  }
}

</style>
