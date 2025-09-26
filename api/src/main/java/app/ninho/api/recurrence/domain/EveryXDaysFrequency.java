package app.ninho.api.recurrence.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("EVERY_X_DAYS")
public final class EveryXDaysFrequency extends Frequency {
    @Column(name = "interval_days", nullable = false)
    private int intervalDays;

    public int getIntervalDays() {
        return intervalDays;
    }

    public void setIntervalDays(int intervalDays) {
        this.intervalDays = intervalDays;
    }
}
