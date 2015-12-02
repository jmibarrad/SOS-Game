var app = angular.module('SoSApp', []);
app.controller('MainController', function($scope){
    $scope.tamano;
    $scope.player = 1;
    $scope.board=[];
    $scope.select;
    $scope.score1 = 0;
    $scope.score2 = 0;

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

    function getTurn(player){
        return player == 1 ? 2 : 1;
    }

    function addScore(){
        if($scope.player == 1)
            $scope.score2++;
        else
            $scope.score1++;
    }

    $scope.marcar = function(event){

        idMarcar = event.target.id.split('-');
        var c = idMarcar.pop();
        var f = idMarcar.pop();

        if($scope.board[f][c].valor === '_') {
                $scope.board[f][c].valor = $scope.select;
                $scope.player = getTurn($scope.player);
                solve(parseInt(f), parseInt(c), $scope.select);

        }

        console.log('score1: '+$scope.score1);
        console.log('score2: '+$scope.score2);
    };

    function checkBounds(f, c){
        return (f < 0 || f > $scope.tamano || c < 0 || c > $scope.tamano) ? 0 : 1;
    }

    function isCellMarked(f, c){
        return !$scope.board[f][c].isMarked ? 1 : 0;
    }

    function contains_S(f, c){
        return $scope.board[f][c].valor === 'S';
    }

    function contains_O(f, c){
        return $scope.board[f][c].valor === 'O';
    }

    var columns = [], rows = [];

    function solve(f, c, valor){
        if(valor === 'O'){
            if(contains_S(f - 1, c) && contains_S(f + 1, c) && (isCellMarked(f - 1, c) || isCellMarked(f + 1, c)) ){
                rows.push(f - 1); rows.push(f + 1);
                columns.push(c);  columns.push(c);
                addScore();
            }

            if(contains_S(f - 1, c - 1) && contains_S(f + 1, c + 1) && (isCellMarked(f - 1, c - 1) || isCellMarked(f + 1, c + 1)) ){
                rows.push(f - 1); rows.push(f + 1);
                columns.push(c - 1);  columns.push(c +1);
                addScore();
            }

            if(contains_S(f - 1, c + 1) && contains_S(f + 1, c -1) && (isCellMarked(f - 1, c + 1) || isCellMarked(f + 1, c - 1))){
                rows.push(f - 1); rows.push(f + 1);
                columns.push(c + 1);  columns.push(c - 1);
                addScore();
            }

            if(contains_S(f , c - 1) && contains_S(f, c + 1) && (isCellMarked(f, c - 1) || isCellMarked(f, c + 1)) ){
                rows.push(f); rows.push(f);
                columns.push(c - 1);  columns.push(c + 1);
                addScore();
            }

        }else if(valor === 'S'){
            if(contains_O(f - 1, c) && contains_S(f - 2, c) && (isCellMarked(f - 1, c) || isCellMarked(f - 2, c)) ){
                rows.push(f - 1); rows.push(f - 2);
                columns.push(c);  columns.push(c);
                addScore();
            }

            if(contains_O(f + 1, c) && contains_S(f + 2, c) && (isCellMarked(f + 1, c) || isCellMarked(f + 2, c))){
                rows.push(f + 1); rows.push(f + 2);
                columns.push(c);  columns.push(c);
                addScore();
            }

            if(contains_O(f, c - 1) && contains_S(f, c - 2) && (isCellMarked(f, c - 1) || isCellMarked(f, c - 2)) ){
                rows.push(f); rows.push(f);
                columns.push(c - 1);  columns.push(c -2);
                addScore();
            }

            if(contains_O(f, c + 1) && contains_S(f, c + 2) && (isCellMarked(f, c + 1) || isCellMarked(f, c + 2)) ){
                rows.push(f); rows.push(f);
                columns.push(c + 1);  columns.push(c + 2);
                addScore();
            }

            if(contains_O(f - 1, c - 1) && contains_S(f - 2, c - 2) && (isCellMarked(f - 1, c - 1) || isCellMarked(f - 2, c - 2)) ){
                rows.push(f - 1); rows.push(f - 2);
                columns.push(c - 1);  columns.push(c -2);
                addScore();
            }

            if(contains_O(f + 1, c + 1) && contains_S(f + 2, c + 2) && (isCellMarked(f + 1, c + 1) || isCellMarked(f + 2, c + 2)) ){
                rows.push(f + 1); rows.push(f + 2);
                columns.push(c + 1);  columns.push(c + 2);
                addScore();
            }

            if(contains_O(f + 1, c - 1) && contains_S(f + 2, c - 2) && (isCellMarked(f + 1, c - 1) || isCellMarked(f + 2, c - 2)) ){
                rows.push(f + 1); rows.push(f + 2);
                columns.push(c - 1);  columns.push(c - 2);
                addScore();
            }

            if(contains_O(f - 1, c + 1) && contains_S(f - 2, c + 2) && (isCellMarked(f - 1, c + 1) || isCellMarked(f - 2, c + 2)) ){
                rows.push(f - 1); rows.push(f - 2);
                columns.push(c + 1);  columns.push(c + 2);
                addScore();
            }
        }
    }

});