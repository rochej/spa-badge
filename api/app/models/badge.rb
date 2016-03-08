class Badge < ActiveRecord::Base
  belongs_to :peep
  has_many :votes
end
