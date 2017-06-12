#-- encoding: UTF-8

#-- copyright
# OpenProject is a project management system.
# Copyright (C) 2012-2017 the OpenProject Foundation (OPF)
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2017 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See doc/COPYRIGHT.rdoc for more details.
#++

class Queries::WorkPackages::Columns::RelationOfTypeColumn < Queries::WorkPackages::Columns::WorkPackageColumn
  attr_accessor :type

  def initialize(type)
    super

    self.type = type
  end

  def name
    "relations_of_type_#{type[:sym]}".to_sym
  end

  def sym
    type[:sym]
  end

  def relation_type
    sym
  end

  def caption
    I18n.t(:'activerecord.attributes.query.relations_of_type_column',
           type: I18n.t(type[:sym_name]))
  end

  def self.instances(_context = nil)
    Relation::TYPES.map { |_key, type| new(type) }
  end
end
