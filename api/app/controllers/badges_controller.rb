class BadgesController < ApplicationController
  before_action :set_peep, only: :show
  before_action :set_badge, only: :show

  def create
    @peep = Peep.find(params[:peep_id])
    p "*" * 80
    p params
    @badge = Badge.new(text: params[:text])
    @badge.peep = @peep
    @badge.save

    render :json => jsonify_badge(@peep, @badge)
  end

end
