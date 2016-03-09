class ApplicationController < ActionController::API
  def set_peep
    @peep = Peep.find(params[:id])
  end

  def set_badge
    @badge = Badge.find(params[:badge_id])
  end

  def set_vote
    @vote = Vote.find(params[:vote_id])
  end

  def count_votes(badge)
    count = [0,0]
    badge.votes.each do |vote|
      if vote.up == true
        count[0] +=1
      else
        count[1] +=1
      end
    end
    return count
  end
end
