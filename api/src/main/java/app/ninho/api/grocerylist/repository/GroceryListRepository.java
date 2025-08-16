package app.ninho.api.grocerylist.repository;

import app.ninho.api.grocerylist.domain.GroceryList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface GroceryListRepository extends JpaRepository<GroceryList, String> {

//    @Query("""
//        SELECT new app.ninho.api.grocerylist.dto.ListActiveGroceryListsResponse(
//            groceryList.id,
//            groceryList.title,
//            SUM(CASE WHEN item.completedAt IS NOT NULL THEN 1 ELSE 0 END),
//            COUNT(groceryList),
//            new app.ninho.api.grocerylist.dto.ListActiveGroceryListsResponse.CreatedBy(
//                owner.id, owner.firstName, owner.lastName, owner.avatar
//            ),
//            groceryList.createdAt
//        )
//        FROM GroceryList groceryList
//        LEFT JOIN groceryList.items item
//        JOIN groceryList.owner owner
//        WHERE groceryList.isActive = true
//          AND (:completed IS NULL OR (
//                :completed = TRUE AND EXISTS (
//                    SELECT 1 FROM GroceryListItem gli2 WHERE gli2.list = groceryList AND gli2.completedAt IS NOT NULL
//                )
//              ) OR (
//                :completed = FALSE AND NOT EXISTS (
//                    SELECT 1 FROM GroceryListItem gli2 WHERE gli2.list = groceryList AND gli2.completedAt IS NOT NULL
//                )
//              )
//          )
//        GROUP BY groceryList.id, groceryList.title, owner.id, owner.firstName, owner.lastName, owner.avatar, groceryList.createdAt
//        ORDER BY
//          CASE WHEN :sort = 'desc' THEN groceryList.createdAt END DESC,
//          CASE WHEN :sort = 'asc' THEN groceryList.createdAt END ASC
//    """)
//    List<ListActiveGroceryListsResponse> findAllActive(@Param("sort") String sort, @Param("completed") Boolean completed);

    @Query("""
        SELECT DISTINCT gl FROM GroceryList gl
        LEFT JOIN FETCH gl.items gli
        LEFT JOIN FETCH gli.category
        LEFT JOIN FETCH gli.addedBy
        LEFT JOIN FETCH gli.completedBy
        LEFT JOIN FETCH gl.owner
        LEFT JOIN FETCH gl.closedBy
        WHERE gl.id = :id
    """)
    Optional<GroceryList> findByIdWithDetails(@Param("id") String id);
}
