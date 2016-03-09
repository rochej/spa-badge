class VotesController < ApplicationController
  before_action :set_peep, only: :show
  before_action :set_badge, only: :show

  def index
    @peep = Peep.find(params[:peep_id])
    new_vote = @peep.badges.find(params[:badge_id]).votes.create(up: params[:up_vote])
    # @vote = Vote.create(params)
    p "*" * 80
    p params
    p new_vote
    return "hello"
  end
end
