class VotesController < ApplicationController
  before_action :set_peep, only: :show
  before_action :set_badge, only: :show

  def create
    @vote = Vote.create(params)
  end
end
