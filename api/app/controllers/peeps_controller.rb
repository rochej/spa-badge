class PeepsController < ApplicationController
  before_action :set_peep, only: :show

  def index
    @peeps = Peep.all
    @peeps_hash = {}
    @peeps_hash[:peeps]=@peeps
    render :json => @peeps_hash
  end

  def show
    @badges = @peep.badges
  end

end
