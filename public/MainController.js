var app = angular.module('SoSApp', []);
app.controller('MainController', function($scope){
    $scope.matrix_size;
    $scope.current_player = 1;
    $scope.board=[];
    $scope.selected_value;
    $scope.score1 = 0;
    $scope.score2 = 0;
    var total_cells = 0;
    var cell_info;

    function table_cell(valor, id)
    {
        this.valor = valor;
        this.id = id;
        this.class = 'default';
    }

    function resetMatch(){
        $scope.current_player = 1;
        $scope.board = [];
    }

    $scope.start_game = function() {
        resetMatch();
        var x, i;
        if ($scope.matrix_size > 2){
            for (x = 0; x < $scope.matrix_size; x++) {
                var fila = [];
                for (i = 0; i < $scope.matrix_size; i++) {
                    fila.push(new table_cell('_', (x + "-" + i)));
                }
                $scope.board.push(fila);
            }
        }else {
            alertify
                .alert("Size must be greater than 2..!", function(){
                    alertify.error('Error message');
                });

        }
    };

    function getTurn(current_player){
        return current_player == 1 ? 2 : 1;
    }

    function addScore(){

        if($scope.current_player == 1)
            $scope.score2++;
        else
            $scope.score1++;
    }

    $scope.marcar = function(event){

        cell_info = event.target.id.split('-');
        var c = cell_info.pop();
        var f = cell_info.pop();

        if($scope.board[f][c].valor === '_') {
                $scope.board[f][c].valor = $scope.selected_value;
                $scope.current_player = getTurn($scope.current_player);
                solve(parseInt(f), parseInt(c), $scope.selected_value);
                total_cells++;
        }

        if(total_cells == (parseInt($scope.matrix_size)*parseInt($scope.matrix_size))){
            var winner;
            if($scope.score1 > $scope.score2)
                winner = 1;
            else if($scope.score1 < $scope.score2)
                winner = 2;

            alertify
                .alert("Congrats player: " + winner + " you have won!", function(){
                    alertify.message('OK');
                });
        }
    };

    function checkBounds(f, c){
        return ((f < 0 || f >= $scope.matrix_size) || (c < 0 || c >= $scope.matrix_size)) ? 0 : 1;
    }

    function contains_S(f, c){
        if(checkBounds(f,c))
            return $scope.board[f][c].valor === 'S';
    }

    function contains_O(f, c){
        if(checkBounds(f,c))
            return $scope.board[f][c].valor === 'O';
    }

    var columns = [], rows = [];

    function solve(f, c, valor){
        if(valor === 'O'){
            if(contains_S(f - 1, c) && contains_S(f + 1, c)){
                rows.push(f - 1); rows.push(f + 1);
                columns.push(c);  columns.push(c);
                addScore();
            }

            if(contains_S(f - 1, c - 1) && contains_S(f + 1, c + 1)){
                rows.push(f - 1); rows.push(f + 1);
                columns.push(c - 1);  columns.push(c +1);
                addScore();
            }

            if(contains_S(f - 1, c + 1) && contains_S(f + 1, c -1)){
                rows.push(f - 1); rows.push(f + 1);
                columns.push(c + 1);  columns.push(c - 1);
                addScore();
            }

            if(contains_S(f , c - 1) && contains_S(f, c + 1)){
                rows.push(f); rows.push(f);
                columns.push(c - 1);  columns.push(c + 1);
                addScore();
            }

        }else if(valor === 'S'){
            if(contains_O(f - 1, c) && contains_S(f - 2, c)){
                rows.push(f - 1); rows.push(f - 2);
                columns.push(c);  columns.push(c);
                addScore();
            }

            if(contains_O(f + 1, c) && contains_S(f + 2, c)){
                rows.push(f + 1); rows.push(f + 2);
                columns.push(c);  columns.push(c);
                addScore();
            }

            if(contains_O(f, c - 1) && contains_S(f, c - 2)){
                rows.push(f); rows.push(f);
                columns.push(c - 1);  columns.push(c -2);
                addScore();
            }

            if(contains_O(f, c + 1) && contains_S(f, c + 2)){
                rows.push(f); rows.push(f);
                columns.push(c + 1);  columns.push(c + 2);
                addScore();
            }

            if(contains_O(f - 1, c - 1) && contains_S(f - 2, c - 2)){
                rows.push(f - 1); rows.push(f - 2);
                columns.push(c - 1);  columns.push(c -2);
                addScore();
            }

            if(contains_O(f + 1, c + 1) && contains_S(f + 2, c + 2)){
                rows.push(f + 1); rows.push(f + 2);
                columns.push(c + 1);  columns.push(c + 2);
                addScore();
            }

            if(contains_O(f + 1, c - 1) && contains_S(f + 2, c - 2)){
                rows.push(f + 1); rows.push(f + 2);
                columns.push(c - 1);  columns.push(c - 2);
                addScore();
            }

            if(contains_O(f - 1, c + 1) && contains_S(f - 2, c + 2)){
                rows.push(f - 1); rows.push(f - 2);
                columns.push(c + 1);  columns.push(c + 2);
                addScore();
            }
        }
    }

});