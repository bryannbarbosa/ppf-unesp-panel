"use strict";angular.module("maikeApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngFileUpload","ckeditor"]).config(["$routeProvider","$httpProvider","$locationProvider",function(a,b,c){var d="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTAzNTk0OTk1fQ.QWsAgg-RBdfplmc6FzXMyxpQDjCpG4zhlYDnHYPvoGg";b.defaults.headers.common.Authorization="Bearer "+d,a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/exercicios",{templateUrl:"views/exercises.html",controller:"ExercisesCtrl",controllerAs:"exercises"}).when("/comparacoes",{templateUrl:"views/comparisons.html",controller:"ComparisonsCtrl",controllerAs:"comparisons"}).when("/comparacoes/listar",{templateUrl:"views/comparisonslist.html",controller:"ComparisonslistCtrl",controllerAs:"comparisonsList"}).when("/categorias/listar",{templateUrl:"views/categorieslist.html",controller:"CategorieslistCtrl",controllerAs:"categoriesList"}).when("/passos",{templateUrl:"views/steps.html",controller:"StepsCtrl",controllerAs:"steps"}).when("/passos/listar",{templateUrl:"views/stepslist.html",controller:"StepslistCtrl",controllerAs:"stepsList"}).otherwise({redirectTo:"/"}),c.hashPrefix("")}]),angular.module("maikeApp").controller("MainCtrl",["$scope","maikeAPI","$window",function(a,b,c){b.connect("categories").get(function(b){a.categories=b},function(a){console.log("error in get categories")}),a.insertCategory=function(d){b.connect("categories").save(angular.copy(d),function(b,d){c.alert("Categoria criada com sucesso!"),a.getCategories(),a.category.category_name=""},function(a){c.alert("Erro em criar a categoria, tente novamente.")})}}]),angular.module("maikeApp").factory("maikeAPI",["$resource",function(a){return{connect:function(b){var c="http://191.252.113.109:4000/api/";return a(c+b,null,{update:{method:"PUT"}})}}}]),angular.module("maikeApp").controller("ExercisesCtrl",["maikeAPI","$scope","$window",function(a,b,c){a.connect("exercises").get(function(a){b.exercises=a},function(a){console.log("error in get exercises")}),a.connect("categories").get(function(a){b.categories=a},function(a){console.log("error in get categories")}),b.getExercises=function(){a.connect("exercises").get(function(a){b.exercises=a},function(a){console.log("error in get exercises")})},b.insertExercise=function(d){var e={id_category:d.category.id,exercise_name:d.exercise_name};a.connect("exercises").save(angular.copy(e),function(a,d){c.alert("Exercício criado com sucesso com sucesso!"),b.getExercises(),b.exercise.exercise_name=""},function(a){c.alert("Erro em criar o exercício, tente novamente.")})},b.updateExercise=function(d){var e=d.id,f={exercise_name:d.exercise_name};a.connect("exercises/"+e).update(f,function(a,d){c.alert("Exercício atualizado com sucesso!"),b.getExercises()},function(a){c.alert("Erro ao atualizar exercício, tente novamente")})},b.removeExercise=function(d){confirm("Deseja realmente remover os exercícios?")&&a.connect("exercises/"+d).remove(function(a,d){c.alert("Exercício removido com sucesso!"),b.getExercises()},function(a){c.alert("Erro em remover os exercícios, tente novamente.")})}}]),angular.module("maikeApp").controller("ComparisonsCtrl",["$scope","$window","maikeAPI","Upload",function(a,b,c,d){c.connect("exercises").get(function(b){a.exercises=b},function(a){console.log("error in get exercises")}),a.comparison={},a.options={language:"pt-br",allowedContent:!0,entities:!1},a.insertComparison=function(c,e){e=a.comparison,d.upload({url:"http://191.252.113.109:4000/api/comparisons",data:{file:c,comparison:e}}).then(function(a){0===a.data.response.error_code?b.alert("Comparação inserida com sucesso!"):console.log(a)},function(a){b.alert("Erro ao inserir comparação, tente novamente.")})}}]),angular.module("maikeApp").controller("ComparisonslistCtrl",["$scope","maikeAPI","$window","Upload",function(a,b,c,d){b.connect("comparisons").get(function(b){a.comparisons=b,console.log(a.comparisons)},function(a){console.log("error in get comparisons")}),a.getComparisons=function(){b.connect("comparisons").get(function(b){a.comparisons=b},function(a){console.log("error in get comparisons")})},a.updateComparison=function(b,e){d.upload({url:"http://191.252.113.109:4000/api/comparisons/"+e.id,method:"PUT",data:{file:b,comparison_content:e.comparison_content,comparison_id:e.id,comparison_type:e.comparison_type}}).then(function(b){0===b.data.response.error_code?(c.alert("Comparação atualizada com sucesso!"),a.getComparisons()):console.log(b)},function(a){c.alert("Erro ao atualizar comparação, tente novamente.")})},a.removeComparison=function(d){confirm("Deseja realmente remover a comparação?")&&b.connect("comparisons/"+d).remove(function(b,d){c.alert("Comparação removida com sucesso!"),a.getComparisons()},function(a){c.alert("Erro em remover a comparação, tente novamente.")})}}]),angular.module("maikeApp").controller("CategorieslistCtrl",["$scope","maikeAPI","$window",function(a,b,c){b.connect("categories").get(function(b){a.categories=b},function(a){console.log("error in get categories")}),a.getCategories=function(){b.connect("categories").get(function(b){a.categories=b},function(a){console.log("error in get categories")})},a.removeCategory=function(d){confirm("Deseja realmente remover a categoria?")&&b.connect("categories/"+d).remove(function(b,d){c.alert("Categoria removida com sucesso!"),a.getCategories()},function(a){c.alert("Erro em remover a categoria, tente novamente.")})},a.updateCategory=function(d){var e=d.id,f={category_name:d.category_name};b.connect("categories/"+e).update(f,function(b,d){c.alert("Categoria atualizada com sucesso!"),a.getCategories()},function(a){console.log(a)})}}]),angular.module("maikeApp").controller("StepsCtrl",["$scope","maikeAPI","$window","Upload",function(a,b,c,d){b.connect("exercises").get(function(b){a.exercises=b},function(a){console.log("error in get exercises")}),a.options={language:"pt-br",allowedContent:!0,entities:!1},a.insertStep=function(e,f){if("image"==f.step_type)d.upload({url:"http://191.252.113.109:4000/api/steps",data:{file:e,step:f}}).then(function(a){0===a.data.response.error_code?c.alert("Passo inserida com sucesso!"):console.log(a)},function(a){c.alert("Erro ao inserir passo, tente novamente.")});else{var g={name:a.step.name,step_content:a.step.step_content,exercise_id:a.step.exercise_id,step_type:a.step.step_type};b.connect("steps").save(g,function(a){0===a.error_code?c.alert("Passo inserido com sucesso"):console.log(a)},function(a){console.log("error in get exercises")})}}}]),angular.module("maikeApp").controller("StepslistCtrl",["$scope","maikeAPI","$window","Upload",function(a,b,c,d){b.connect("steps").get(function(b){a.steps=b,console.log(a.steps)},function(a){console.log("error in get steps")}),a.getSteps=function(){b.connect("steps").get(function(b){a.steps=b},function(a){console.log("error in get steps")})},a.updateStep=function(e,f){if("image"==f.step_type&&(d.upload({url:"http://191.252.113.109:4000/api/steps/"+f.id,method:"PUT",data:{file:e,step_name:f.step_name,step_content:f.step_content}}).then(function(a){0===a.data.response.error_code?c.alert("Passo atualizado com sucesso!"):console.log(a)},function(a){c.alert("Erro ao atualizar passo, tente novamente.")}),a.getSteps()),"text"==f.step_type){var g={step_name:f.step_name,step_content:f.step_content};b.connect("steps/"+f.id).update(angular.copy(g),function(b,d){c.alert("Passo atualizado com sucesso com sucesso!"),a.getSteps()},function(a){c.alert("Erro em atualizar o passo, tente novamente."),console.log(a)}),a.getSteps()}},a.removeStep=function(d){confirm("Deseja realmente remover o passo?")&&b.connect("steps/"+d).remove(function(b,d){c.alert("Passo removida com sucesso!"),a.getSteps()},function(a){c.alert("Erro em remover o passo, tente novamente.")})}}]),angular.module("maikeApp").run(["$templateCache",function(a){a.put("views/categorieslist.html",'<div ng-repeat="object in categories"> <div class="row"> <div class="col-sm-4 col-sm-offset-4"> <h3 class="text-center" style="margin-top: 5em">Categorias</h3> <div ng-repeat="category in object.categories" ng-init="edit = true" ng-show="edit" href=""> <div class="form-group"> <input type="text" class="form-control" ng-model="category.category_name" value="{{ category.category_name }}"> </div> <div class="form-group"> <button class="btn btn-success btn-block" ng-click="updateCategory(category)">Salvar</button> </div> <div class="form-group"> <button class="btn btn-danger btn-block" ng-click="removeCategory(category.id)">Remover Categoria</button> </div> <hr> </div> </div> </div> </div>'),a.put("views/comparisons.html",'<div class="row"> <div class="col-sm-6 col-sm-offset-3"> <form name="exerciseform"> <h3 class="text-center" style="margin-top: 18vh">Inserir Comparação</h3> <div class="form-group" style="text-align: center"> <img class="img-responsive" style="display: inline-block" ngf-src="modify || \'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSulT8SpTzCABsEFxuwjioGPO708jFtGB6DMWG_eJT1an7d_W_P_Q\'"> </div> <div class="form-group"> <label class="btn btn-primary btn-block btn-file"> Selecionar Imagem da câmera <input type="file" ngf-select ng-model="modify" name="modify" ngf-pattern="\'image/*\'" accept="image/*" ngf-max-size="20MB" style="display: none"> </label> </div> <div class="form-group" ng-repeat="object in exercises"> <select class="form-control" ng-disabled="!modify" ng-model="comparison.exercise_id" ng-options="exercise.exercise_name + \' - \' + exercise.category_name for exercise in object.exercises" required> <option selected disabled value="">Selecione o exercício</option> </select> </div> <div class="form-group text-center"> <a href="" class="btn btn-primary btn-block" ng-disabled="!exerciseform.$valid" ng-click="insertComparison(modify, comparison)">Inserir Comparação</a> </div> </form> </div> </div>'),a.put("views/comparisonslist.html",'<div class="row"> <div class="col-sm-4 col-sm-offset-4"> <h3 class="text-center" style="margin-top: 14vh; margin-bottom: 0.5em">Comparações</h3> <div ng-repeat="object in comparisons"> <div ng-repeat="comparison in object.comparisons"> <p class="text-center">Comparação em câmera</p> <div class="form-group"> <img class="img-responsive" ngf-src="modify || comparison.image_comparison_modify"> </div> <div class="form-group"> <label class="btn btn-primary btn-block btn-file"> Alterar Imagem em câmera <input type="file" ngf-select ng-model="modify" name="modify" ngf-pattern="\'image/*\'" accept="image/*" ngf-max-size="20MB" style="display: none"> </label> </div> <div class="form-group"> <button class="btn btn-success btn-block" ng-click="comparison.comparison_type = \'modify\'; updateComparison(modify, comparison);">Salvar imagem em câmera</button> </div> <p class="text-center">Comparação original</p> <div class="form-group"> <img class="img-responsive" ngf-src="original || comparison.image_comparison_original"> </div> <div class="form-group"> <label class="btn btn-primary btn-block btn-file"> Alterar Imagem original <input type="file" ngf-select ng-model="original" name="original" ngf-pattern="\'image/*\'" accept="image/*" ngf-max-size="20MB" style="display: none"> </label> </div> <div class="form-group"> <button class="btn btn-success btn-block" ng-click="comparison.comparison_type = \'original\'; updateComparison(original, comparison);">Salvar imagem original</button> </div> <div class="form-group"> <div class="alert alert-info"> Fotos de {{ comparison.exercise_name }} em {{ comparison.category_name }} </div> </div> <div class="form-group"> <button class="btn btn-danger btn-block" ng-click="removeComparison(comparison.id)">Remover Grupo de comparações</button> </div> </div> </div> <div class="text-center" ng-if="comparisons.response.comparisons.length == 0"> <p> Não há comparações disponíveis </p> </div> </div> </div>'),a.put("views/exercises.html",'<div class="row"> <div class="col-sm-12"> <h3 class="text-center" style="margin-top: 15vh; margin-bottom: 0.5em">Inserir Exercício</h3> <div ng-repeat="object in exercises"> <div> <div class="list-group"> <span ng-repeat="exercise in object.exercises" ng-init="edit = true" ng-show="edit" href="" class="list-group-item"> <input type="text" ng-model="exercise.exercise_name" style="width: 50%" value="{{ exercise.exercise_name }}"> <span class="pull-right"> <button ng-click="removeExercise(exercise.id)" class="btn btn-xs btn-danger">Remover</button> <button ng-click="updateExercise(exercise)" class="btn btn-xs btn-success">Salvar</button> <button class="btn btn-xs btn-info">Categoria {{ exercise.category_name }}</button> </span> </span> </div> </div> </div> <form name="exerciseform"> <div class="form-group"> <input type="text" class="form-control" ng-model="exercise.exercise_name" placeholder="Nome do Exercício" required> </div> <div class="form-group" ng-repeat="object in categories"> <select class="form-control" ng-disabled="!exercise.exercise_name" ng-model="exercise.category" ng-options="category.category_name for category in object.categories" required> <option selected disabled value="">Selecione sua categoria</option> </select> </div> <div class="form-group text-center"> <a href="" class="btn btn-primary" ng-disabled="!exerciseform.$valid" ng-click="insertExercise(exercise)">Inserir Exercício</a> </div> </form> </div> </div>'),a.put("views/main.html",'<div class="row"> <div class="col-sm-4 col-sm-offset-4"> <h3 class="text-center" style="margin-top: 25vh; margin-bottom: 0.5em">Inserir Categoria</h3> <form name="categoryform"> <div class="form-group"> <input type="text" class="form-control" ng-model="category.category_name" placeholder="Nome da Categoria" required> </div> <div class="form-group text-center"> <a href="" class="btn btn-primary" ng-disabled="!categoryform.$valid" ng-click="insertCategory(category)">Inserir Categoria</a> </div> </form> </div> </div>'),a.put("views/steps.html",'<div class="row"> <div class="col-sm-6 col-sm-offset-3"> <form name="exerciseform"> <h3 class="text-center" style="margin-top: 18vh">Inserir Passo</h3> <div class="form-group"> <select class="form-control" ng-model="step.step_type" required> <option selected disabled value="">Selecione o tipo de passo</option> <option value="text">Texto</option> <option value="image">Imagem</option> </select> </div> <div class="form-group" ng-show="step.step_type == \'image\'"> <img class="img-responsive" ngf-src="file || \'https://www.flooringvillage.co.uk/ekmps/shops/flooringvillage/images/request-a-sample--547-p.jpg\'"> </div> <div class="form-group" ng-show="step.step_type == \'image\'"> <label class="btn btn-primary btn-block btn-file"> Selecionar Imagem <input type="file" ngf-select ng-model="file" name="file" ngf-pattern="\'image/*\'" accept="image/*" ngf-max-size="20MB" style="display: none"> </label> </div> <div class="form-group"> <input type="text" class="form-control" ng-model="step.name" placeholder="Nome do passo" required> </div> <div class="form-group" ng-show="step.step_type == \'text\'"> <div ckeditor="options" id="editor" ng-model="step.step_content" required></div> </div> <div class="form-group" ng-repeat="object in exercises"> <select class="form-control" ng-disabled="!step.name" ng-model="step.exercise_id" ng-options="exercise.exercise_name + \' - \' + exercise.category_name for exercise in object.exercises" required> <option selected disabled value="">Selecione o exercício</option> </select> </div> <div class="form-group text-center"> <a href="" class="btn btn-primary btn-block" ng-disabled="!step.name" ng-click="insertStep(file, step)">Inserir Passo</a> </div> </form> </div> </div>'),a.put("views/stepslist.html",'<div class="row"> <div class="col-sm-4 col-sm-offset-4"> <h3 class="text-center" style="margin-top: 14vh; margin-bottom: 0.5em">Passos</h3> <div ng-repeat="object in steps"> <div ng-repeat="step in object.steps"> <div class="form-group" ng-show="step.step_type == \'image\'"> <img class="img-responsive" ng-if="step.step_type == \'image\'" ngf-src="file || step.step_content"> </div> <div class="form-group"> <input type="text" class="form-control" ng-model="step.step_name"> </div> <div class="form-group" ng-if="step.step_type == \'text\'"> <div ckeditor="options" id="editor" ng-model="step.step_content" required></div> </div> <div class="form-group"> <div class="alert alert-info"> Passo do {{ step.exercise_name }} em {{ step.category_name }} </div> </div> <div class="form-group" ng-show="step.step_type == \'image\'"> <label class="btn btn-primary btn-block btn-file"> Alterar Imagem <input type="file" ngf-select ng-model="file" name="file" ngf-pattern="\'image/*\'" accept="image/*" ngf-max-size="20MB" style="display: none"> </label> </div> <div class="form-group"> <button class="btn btn-success btn-block" ng-click="updateStep(file, step)">Salvar</button> </div> <div class="form-group"> <button class="btn btn-danger btn-block" ng-click="removeStep(step.id)">Remover Comparação</button> </div> </div> </div> <div class="text-center" ng-if="steps.response.steps.length == 0"> <p> Não há passos disponíveis </p> </div> </div></div>')}]);