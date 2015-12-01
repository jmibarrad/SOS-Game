/**
 * Created by Light on 01-Dec-15.
 */

var app = angular.module('SoSApp', []);
app.controller('MainController',function($scope){
    $scope.tamano;
    $scope.board=[];

    function celda(valor, id)
    {
        this.valor=valor;
        this.id=id;
    }

    function fila(fila){
        this.fila=fila;
    }

    $scope.iniciar = function(){
        $scope.board=[];
        for(x=0;x<$scope.tamano;x++){
            var fila=[]
            for(i=0; i<$scope.tamano;i++)
            {
                fila.push(new celda('_',(x+"-"+i)));
            }
            $scope.board.push(fila);
        }
        console.log($scope.tamano);
        //$scope.sizeTable=$scope.tamano;
    };

    $scope.marcar = function(id){
        document.getElementById(id).disabled = 'true';
    };

});