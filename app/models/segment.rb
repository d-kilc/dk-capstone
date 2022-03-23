class Segment < ApplicationRecord
  belongs_to :trip

  validates :from, presence: true
  validates :to, presence: true

  validate :after_previous_segment

  private

  def after_previous_segment
   
    if self.trip_sequence != 1  
      previous_sequence = self.trip_sequence - 1
      previous_segment = Segment.find_by! trip_id: self.trip_id, trip_sequence: previous_sequence
      
      if self.when > previous_segment.when
        return
      end
    
      errors.add(:end, "Please make sure each segment's date is after the previous segment's.")
    end

  end

end
