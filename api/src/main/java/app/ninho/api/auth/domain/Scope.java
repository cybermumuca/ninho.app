package app.ninho.api.auth.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "scopes")
public class Scope {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public Scope() {}

    public Scope(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public enum Values {
        // Grocery List permissions
        GROCERY_LIST_LIST("grocery_list:list", "Permissão para listar todas as listas de compras"),
        GROCERY_LIST_CREATE("grocery_list:create", "Permissão para criar uma nova lista de compras"),
        GROCERY_LIST_UPDATE("grocery_list:update", "Permissão para editar detalhes de uma lista de compras existente"),
        GROCERY_LIST_DELETE("grocery_list:delete", "Permissão para deletar uma lista de compras"),
        GROCERY_LIST_CLOSE("grocery_list:close", "Permissão para fechar/finalizar uma lista de compras"),
        GROCERY_LIST_ITEM_LIST("grocery_list:item:list", "Permissão para listar itens de uma lista de compras"),
        GROCERY_LIST_ITEM_READ("grocery_list:item:read", "Permissão para visualizar um item de lista de compras"),
        GROCERY_LIST_ITEM_CREATE("grocery_list:item:create", "Permissão para adicionar um item à uma lista de compras"),
        GROCERY_LIST_ITEM_UPDATE("grocery_list:item:update", "Permissão para editar um item da lista de compras"),
        GROCERY_LIST_ITEM_DELETE("grocery_list:item:delete", "Permissão para remover um item da lista de compras"),
        GROCERY_LIST_ITEM_COMPLETE("grocery_list:item:complete", "Permissão para marcar/desmarcar um item como concluído"),
        GROCERY_LIST_ITEM_COMPLETE_ALL("grocery_list:item:complete_all", "Permissão para marcar/desmarcar todos os itens de uma lista"),
        GROCERY_LIST_ITEM_UNCOMPLETE("grocery_list:item:uncomplete", "Permissão para desmarcar um item como não concluído"),
        GROCERY_LIST_ITEM_UNCOMPLETE_ALL("grocery_list:item:uncomplete_all", "Permissão para desmarcar todos os itens de uma lista como não concluídos"),

        // Room permissions
        ROOM_LIST("room:list", "Permissão para listar todos os cômodos"),
        ROOM_READ("room:read", "Permissão para visualizar um cômodo específico"),
        ROOM_CREATE("room:create", "Permissão para criar um novo cômodo"),
        ROOM_UPDATE("room:update", "Permissão para editar um cômodo existente"),
        ROOM_DELETE("room:delete", "Permissão para deletar um cômodo"),

        // Tag permissions
        TAG_CREATE("tag:create", "Permissão para criar uma nova tag"),
        TAG_UPDATE("tag:update", "Permissão para atualizar uma tag existente"),
        TAG_DELETE("tag:delete", "Permissão para deletar uma tag existente"),

        // Category permissions
        CATEGORY_LIST("category:list", "Permissão para listar todas as categorias"),
        CATEGORY_READ("category:read", "Permissão para visualizar detalhes de uma categoria específica"),
        CATEGORY_CREATE("category:create", "Permissão para criar uma nova categoria"),
        CATEGORY_UPDATE("category:update", "Permissão para atualizar uma categoria existente"),
        CATEGORY_DELETE("category:delete", "Permissão para deletar uma categoria existente"),

        // Habit permissions
        HABIT_CREATE("habit:create", "Permissão para criar um novo hábito"),

        // Task permissions
        TASK_CREATE("task:create", "Permissão para criar uma nova tarefa"),
        TASK_READ("task:read", "Permissão para ler/visualizar uma tarefa existente"),
        TASK_DELETE("task:delete", "Permissão para deletar uma tarefa existente");

        public final String name;
        public final String description;

        Values(String name, String description) {
            this.name = name;
            this.description = description;
        }
    }
}
