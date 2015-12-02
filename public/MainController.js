var app = angular.module('SoSApp', []);
app.controller('MainController', function($scope){
    $scope.tamano;
    $scope.player = 1;
    $scope.board=[];
    $scope.select;

    var idMarcar;

    function celda(valor, id)
    {
        this.valor = valor;
        this.id = id;
        this.isMarked = 0;
    }

    function resetMatch(){
        $scope.player = 1;
        $scope.board = [];
    }

    $scope.iniciar = function(){

        resetMatch();
        var x, i;
        if($scope.tamano > 2)
            for(x=0; x < $scope.tamano; x++){
                var fila = [];
                for(i=0; i < $scope.tamano; i++)
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

    function checkBounds(f, c){
        return (f < 0 || f > $scope.tamano || c < 0 || c > $scope.tamano) ? 0 : 1;
    }

    function contains_S(f, c){
        return $scope.board[f][c].valor === 'S' && !$scope.board[f][c].isMarked ? 1 : 0;
    }

    function contains_O(f, c){
        return $scope.board[f][c].valor === 'O' && !$scope.board[f][c].isMarked ? 1 : 0;
    }

    function solve(f, c, valor){
        if(valor === 'O'){
            if(contains_S(f - 1, c) && contains_S(f + 1, c))

            if(contains_S(f - 1, c - 1) && contains_S(f + 1, c + 1))

            if(contains_S(f - 1, c +1) && contains_S(f + 1, c -1))

            if(contains_S(f , c - 1) && contains_S(f, c + 1))
                return 0;

        }else{
            if(contains_O(f - 1, c) && contains_S(f - 2, c))

            if(contains_O(f + 1, c) && contains_S(f + 2, c))

            if(contains_O(f, c - 1) && contains_S(f, c - 2))

            if(contains_O(f, c + 1) && contains_S(f, c + 2))

            if(contains_O(f - 1, c - 1) && contains_S(f - 2, c - 2))

            if(contains_O(f + 1, c + 1) && contains_S(f + 2, c + 2))

            if(contains_O(f + 1, c - 1) && contains_S(f + 2, c - 2))

            if(contains_O(f - 1, c + 1) && contains_S(f - 2, c + 2))

                return 0;

        }
    }

});