class ApplicationController < ActionController::API
  def set_peep
    @peep = Peep.find(params[:peep_id])
  end

  def set_badge
    @badge = Badge.find(params[:badge_id])
  end

  def set_vote
    @vote = Vote.find(params[:vote_id])
  end
end
