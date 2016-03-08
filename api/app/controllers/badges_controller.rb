class BadgesController < ApplicationController
  before_action :set_peep, only: :show
  before_action :set_badge, only: :show

  def create
    @badge = Badge.create(params)
  end

end
