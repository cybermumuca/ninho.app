package app.ninho.api.recurrence.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SINGLE")
public final class SingleOccurrenceFrequency extends Frequency {}
