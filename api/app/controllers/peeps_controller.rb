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
      count = count_votes(badge)
      badge_votes<< {peep_id: @peep.id, badge_id: badge.id, text: badge.text, up_votes: count[0], down_votes: count[1]}
    end
    render :json => {peep: @peep, badges: badge_votes}
  end

end
