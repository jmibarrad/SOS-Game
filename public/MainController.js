var app = angular.module('SoSApp', []);
app.controller('MainController',function($scope){
    $scope.tamano;
    $scope.player = 1;
    $scope.board=[];
    $scope.select;

    var idMarcar;

    function celda(valor, id)
    {
        this.valor = valor;
        this.id = id;
    }

    function fila(fila){
        this.fila=fila;
    }

    function resetMatch(){
        $scope.player = 1;
        $scope.board = [];
    }

    $scope.iniciar = function(){

        resetMatch();
        var x, i;
        if($scope.tamano > 2)
            for(x=0; x<$scope.tamano; x++){
                var fila = [];
                for(i=0; i<$scope.tamano; i++)
                {
                    fila.push(new celda('_',(x+"-"+i)));
                }
                $scope.board.push(fila);
            }
    };

    function getTurno(player){
        return player == 1 ? 2 : 1;
    }

    $scope.marcar = function(event){

        idMarcar = event.target.id.split('-');
        var c = idMarcar.pop();
        var f = idMarcar.pop();
        
        if($scope.board[f][c].valor === '_') {
                $scope.board[f][c].valor = $scope.select;
                $scope.player = getTurno($scope.player);
            }

    };
});