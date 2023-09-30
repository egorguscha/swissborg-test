### Assumptions

This is solution almost ready to scale.
It has reusable and testable code, UI and business logic is separate what gives you change UI without any logic changes. Functions follow separation of concern. There is API layer which gives you clarification where requests come from and you can handle anything you need there

### Pitfalls

1. Lack of income decimals values hence basic operation with currency will be incorrect because of js has issues with precision
2. When we work with currency better to use bignumber.js especially with crypto currency
3. Because of data a bit incorrect, column creation in Summary table has keys with spaces and some symbols can be incorrect of smth else, you should pay attention on it
4. Pay attention that withdraw can't be if balance is negative and it should be handled but I've followed example
