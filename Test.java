import java.util.*;
import java.util.List;
class Test {

    public static void main(String args[]) {
        
        List<Integer> prices = new ArrayList<Integer>();
        prices.add(4);
        prices.add(9);
        prices.add(2);
        prices.add(3);

        int minPrice = prices.get(0);
        long amount = minPrice;

        for(int i = 1;i < prices.size();i++)
        {
            amount += Math.max(prices.get(i) - minPrice,0);
            minPrice = Math.min(minPrice,prices.get(i));
        }

        System.out.println(8>>1);
    }
}