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

  def jsonify_badge(peep, badge)
    count = count_votes(badge)
    return {peep_id: peep.id, badge_id: badge.id, text: badge.text, up_votes: count[0], down_votes: count[1]}
  end
end
