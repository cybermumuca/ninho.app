package app.ninho.api.recurrence.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("DAILY")
public final class DailyFrequency extends Frequency {}
