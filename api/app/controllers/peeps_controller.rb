class PeepsController < ApplicationController
  before_action :set_peep, only: :show

  def index
    @peeps = Peep.all
    render :json => @peeps
  end

  def show
    @peep = Peep.find(params[:id])
    @badges = @peep.badges
    badge_votes = []
    @badges.each do |badge|
      badge_votes << jsonify_badge(@peep, badge)
    end
    render :json => {peep: @peep, badges: badge_votes}
  end

end
