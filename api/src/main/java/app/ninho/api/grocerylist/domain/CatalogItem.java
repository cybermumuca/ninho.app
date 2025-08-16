package app.ninho.api.grocerylist.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "catalog_items")
public class CatalogItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private GroceryCategory category;

    // TODO: WIP - add more fields
}
