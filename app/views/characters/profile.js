/**
 * Created by lelabo on 02/05/17.
 */
angular.module('gurps-online').controller('charactersProfileCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                            CharactersService, Characters,
                                                                            MenuService) {
    function loadCharacter() {
        CharactersService.get($stateParams.characterId).then(function (user) {
            $scope.character = Characters.build(user);
            console.log($scope.character);
            MenuService.currentTitle = $scope.character.name;
        }, function (err) {
            console.log(err);
        });
    }

    loadCharacter();

    $scope.showJoin = function (ev) {
        $mdDialog.show({
            controller: JoinController,
            templateUrl: 'views/characters/join.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            targetEvent: ev
        }).then(function(answer) {
            CharactersService.joinCampaign($scope.character._id, answer._id);
            loadCharacter();
        });
    };

    $scope.leave = function () {
        CharactersService.leaveCampaign($scope.character._id);
        loadCharacter();
    }
});

function JoinController($scope, $mdDialog, CampaignService, Campaigns) {
    CampaignService.all().then(function (success) {
        $scope.campaigns = Campaigns.json_to_objects(success);
    }, function (err) {
        console.log(err);
    });

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.joinIt = function(answer) {
        $mdDialog.hide(answer);
    };
}