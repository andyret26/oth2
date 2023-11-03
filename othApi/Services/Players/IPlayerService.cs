using othApi.Data.Entities;

namespace othApi.Services.Players;

public interface IPlayerService
{
    List<Player> Get();
    Player? GetById(int id);
    public List<Player>? GetMultipleById(List<int> ids);
    Player Post(Player player);
    Player? Update(Player player);
    Player? Delete(int id);
    bool Exists(int id);

}