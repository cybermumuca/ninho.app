package app.ninho.api.recurrence.domain;

import app.ninho.api.recurrence.domain.type.PeriodUnit;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("PERIOD_COUNT")
public final class PeriodCountFrequency extends Frequency {

    @Column(name = "count", nullable = false)
    private int count;

    @Column(name = "period", nullable = false)
    @Enumerated(EnumType.STRING)
    private PeriodUnit period;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public PeriodUnit getPeriod() {
        return period;
    }

    public void setPeriod(PeriodUnit period) {
        this.period = period;
    }
}
