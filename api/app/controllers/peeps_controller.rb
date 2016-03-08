class PeepsController < ApplicationController
  before_action :set_peep, only: :show

  def index
    @peeps = Peep.all
  end

end
