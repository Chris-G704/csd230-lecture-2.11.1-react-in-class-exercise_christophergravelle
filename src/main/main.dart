import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(MaterialApp(home: ProductListScreen()));

class ProductListScreen extends StatefulWidget {
  @override
  _ProductListScreenState createState() => _ProductListScreenState();
}

class _ProductListScreenState extends State<ProductListScreen> {
  List books = [];

  @override
  void initState() {
    super.initState();
    fetchBooks();
  }

  // NOTE: Use 10.0.2.2 instead of localhost if using Android Emulator
  fetchBooks() async {
    final response = await http.get(Uri.parse('http://10.0.2.2:8080/api/books'));
    if (response.statusCode == 200) {
      setState(() {
        books = json.decode(response.body);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Mobile Book Store")),
      body: ListView.builder(
        itemCount: books.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(books[index]['title']),
            subtitle: Text(books[index]['author']),
            trailing: Text("\$${books[index]['price']}"),
            leading: Icon(Icons.book),
          );
        },
      ),
    );
  }
}