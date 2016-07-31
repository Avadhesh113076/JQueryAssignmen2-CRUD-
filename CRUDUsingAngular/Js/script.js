var myApp = angular.module('myModel', ['ngAnimate'])
    .controller('myController', function($scope, $http) {
        var start = 0;
        $scope.previous = function() {
            start = start - 100;
            readData(start);
        }
        $scope.next = function() {
            start = start + 100;
            readData(start);
        }
        readData(start);

        function readData(start) {
            $http.get(' http://localhost:8080/book?_start=' + start + '&_limit=100').then(function(response) {
                $scope.myData = response.data;
            });
        } /*End of read data*/

        $scope.add = function() {
            var element = {
                bookName: $scope.bookName,
                price: $scope.price,
                publisherName: $scope.publisherName,
                email: $scope.email,
                phone: $scope.phone,
                published: $scope.published
            }
            $http({
                method: "post",
                url: "http://localhost:8080/book",
                headers: { 'Content-Type': 'application/json' },
                data: element
            }).then(function mySucces(response) {
                console.log(response.data);
                $scope.myData.push(response.data);
            }, function myError(response) {
                alert('error');
            });

            $scope.bookNmae = '',
                $scope.price = '',
                $scope.publisherName = '',
                $scope.email = '',
                $scope.phone = '',
                $scope.published = '';
        } /*end of add function*/

        $scope.addTable = function() {
            $scope.addRecord = true;
            $scope.showButton = true;
        }

        $scope.delete = function(id) {
            var result = confirm('Are you sure want to delete?');
            var temp = 'http://localhost:8080/book/' + id;
            $http.delete(temp, $scope.myData).then(function(response) {
                if (response.data && (result == true)) {
                    var index = getSelectedIndex(id);
                    $scope.myData.splice(index, 1);
                    alert('Data deleted Successfully');
                } else {
                    alert('Error');
                }
            });
        } /*end of delete function*/

        function getSelectedIndex(id) {
            for (var i = 0; i < $scope.myData.length; i++)
                if ($scope.myData[i].id == id)
                    return i;
            return -1;
        } /*End of getSelectedIndex method*/

        $scope.update = function(id) {
            $scope.addRecord = true;
            $scope.showButton = false;
            var index = getSelectedIndex(id);
            var book = $scope.myData[index];
            $scope.id = book.id;
            $scope.bookName = book.bookName;
            $scope.price = book.price;
            $scope.publisherName = book.publisherName;
            $scope.email = book.email;
            $scope.phone = book.phone;
            $scope.published = book.published;
        } /*To initialise table after clicking update button*/

        $scope.save = function() {
            var element = {
                bookName: $scope.bookName,
                price: $scope.price,
                publisherName: $scope.publisherName,
                email: $scope.email,
                phone: $scope.phone,
                published: $scope.published
            }
            $http({
                method: "PUT",
                url: "http://localhost:8080/book/" + $scope.id,
                headers: { 'Content-Type': 'application/json' },
                data: element
            }).then(function mySucces(response) {
                alert('successfully updated');
                $scope.addRecord = false;
            }, function myError(response) {
                alert('error');
            });

            var index = getSelectedIndex($scope.id);

            $scope.myData[index].bookName = $scope.bookName;
            $scope.myData[index].price = $scope.price;
            $scope.myData[index].publisherName = $scope.publisherName;
            $scope.myData[index].email = $scope.email;
            $scope.myData[index].phone = $scope.phone;
            $scope.myData[index].published = $scope.published;
        } /*end of save function*/

        $scope.close = function() {
            $scope.addRecord = false;
        } /*end of close button*/

        $scope.sortColumn = "id";
        $scope.reverseSort = false;

        $scope.sortData = function(column) {
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
            $scope.sortColumn = column;
        }
        $scope.getSortClass = function(column) {
            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
            }

            return '';
        }

        $scope.filterHint = function() {
            $scope.alertShow = true;
        }

    });
