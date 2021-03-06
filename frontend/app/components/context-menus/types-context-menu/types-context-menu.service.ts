//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

import {opWorkPackagesModule} from '../../../angular-modules';
import {WorkPackageCreateService} from '../../wp-create/wp-create.service';
import {CollectionResource} from '../../api/api-v3/hal-resources/collection-resource.service';

class TypesContextMenuController {
  public types:CollectionResource[] = [];
  public isMobile:Boolean;

  constructor(protected $state:ng.ui.IStateService,
              protected $timeout:ng.ITimeoutService,
              protected $scope:ng.IScope,
              protected wpCreate:WorkPackageCreateService) {
    const project = $scope.projectIdentifier;
    $scope.$ctrl = this;
    this.isMobile = document.documentElement.classList.contains('-browser-mobile');

    wpCreate.getEmptyForm(project).then((form:any) => {
      this.types = form.schema.type.allowedValues;

      this.$timeout(() => {
        // Reposition again now that types are loaded
        this.$scope.$root.$emit('repositionDropdown');
      })
    });
  }

  public get stateName() {
    return this.$scope.stateName;
  }
}

function typesContextMenuService(ngContextMenu:any) {
  return ngContextMenu({
    templateUrl: '/components/context-menus/types-context-menu/types-context-menu.service.html',
    controller: TypesContextMenuController
  });
}

opWorkPackagesModule.factory('TypesContextMenu', typesContextMenuService);
