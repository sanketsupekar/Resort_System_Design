class Test {

    
    public static int makeComb(String str, int i, int curNumber, int targetNumber,int res)
    {
        if(curNumber > targetNumber)
        {
            return Integer.MAX_VALUE;
        }
        if(i >= str.length())
        {
            System.out.println(curNumber);

            return res;
        }
      
        int digit = Integer.parseInt(String.valueOf(str.charAt(i))); 
        int left = makeComb(str, i+1, digit, targetNumber,res+1);
        // System.out.println(curNumber);
        int right = makeComb(str, i+1, (curNumber * 10) + digit , targetNumber,res);
        // System.out.println(curNumber);
        // return 0;
    
       return Math.min(left, right);
    }
    public static void main(String args[]) {
        String input1 = "1234";
        int input2 = 30;
        int input3 = 4;
        int result = makeComb(input1,0,0,input2,0);
        System.out.println(result);
    }
}