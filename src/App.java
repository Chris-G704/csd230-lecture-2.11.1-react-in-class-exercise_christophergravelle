package lab2;

import java.awt.print.Book;
import java.io.InputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Scanner;
import lab2.SaleableItem;

public class App {
        private final String menu = "\n***********************\n"
                + " 1. Add Items\n"
                + " 2. Edit Items\n"
                + " 3. Delete Items\n"
                + " 4. Sell item(s)\n"
                + " 5. List items\n"
                + "99. Quit\n"
                + "***********************\n"
                + "Enter choice: ";

        private final ArrayList<SaleableItem> saleableItems = new ArrayList<>();
        private final int currentItem = 0;

        private Scanner input;
        private final PrintStream out;

        // Default constructor
        public App() {
            this(System.in, System.out);
        }

        // Constructor for testing
        public App(InputStream in, PrintStream out) {
            this.input = new Scanner(in);
            this.out = out;
        }

        // Run menu
        public void run() {
            int choice = 0;
            while (choice != 99) {
                System.out.print(menu);
                choice = input.nextInt();
                input.nextLine(); // clear buffer/go to the next line

                if (choice == 1) {
                    addItem(); // If the user inputs 1 as their choice, the item is added.
                } else if (choice == 5) {
                    listAny(); // If the user inputs 5 as their choice, the item is listed.
                } else if (choice == 99) {
                    System.out.println("Goodbye!"); // If the user inputs 99 as their choice, the program exits
                } else {
                   System.out.println("Invalid option."); // If the user inputs something that is not on the list, then you
                }
            }
        }

        // Here's the Add item function
        public void addItem() {
            System.out.print("Add an item");
            System.out.print("Enter title: ");
            String title = input.nextLine();
            System.out.print("Enter author: ");
            String author = input.nextLine();
           System.out.print("Enter copies: ");
            int copies = input.nextInt();
            System.out.print("Enter price: ");
            double price = input.nextDouble();
            input.nextLine();

            Book book = new Book(System.currentTimeMillis(),title, price, copies, "N/A", "N/A", author);

            saleableItems.add(book);
            out.println("Book added!");
        }

        // Here's the List all function
        public void listAny() {
            if (saleableItems.isEmpty()) {
                System.out.println("No items yet.");
            } else {
                System.out.println("Items:");
                for (int i = 0; i < saleableItems.size(); i++) {
                    System.out.println((i + 1) + ". " + saleableItems.get(i));
                }
            }
        }

        // Simple stubs
        public boolean findItemExists(SaleableItem s) {
            return saleableItems.contains(s);
        }

        public SaleableItem findItem(SaleableItem s) {
            return null;
        }

        public void editItem() {
        }

        public void editItem(Editable e) {
        }

        public void deleteItem() {
        }

        public void populate() {
        }

        public SaleableItem getItem(SaleableItem s) {
            return null;
        }

        public void sellItem() {
        }

        public void listI(Object o) {
        }

        public void addItem(SaleableItem s) {
            saleableItems.add(s);
        }
    }
}


