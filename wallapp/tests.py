from datetime import datetime, timedelta
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from django.urls import reverse
from unittest import skip

from core.models import Post

class WallAppTests(APITestCase):
    first_user = {
        'username': 'john',
        'email': 'john@smith.com',
        'password': 'john_is_the_coolest'
    }
    second_user = {
        'username': 'jane',
        'email': 'jane@doe.com',
        'password': 'jane_is_the_greatest'
    }
    token = None
    post_body_text = "test"

    def setUp(self):
        user = User.objects.create_user(
            self.first_user['username'],
            self.first_user['email'],
            self.first_user['password']
        )
        user.save()
        post1 = Post.objects.create(
            body_text="first!",
            pub_date=datetime.now() - timedelta(seconds=3),
            author=user
        )
        post1.save()
        post2 = Post.objects.create(
            body_text="second!",
            pub_date=datetime.now() - timedelta(seconds=2),
            author=user
        )
        post2.save()
        post3 = Post.objects.create(
            body_text="third!",
            pub_date=datetime.now() - timedelta(seconds=1),
            author=user
        )
        post3.save()

    def log_in(self, user, client):
        """
        Helper function to log a test user in
        """
        res = client.post(reverse('auth'), {
            'username': user['username'],
            'password': user['password']
        }, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('token', res.data)
        self.token = res.data['token']

    def test_post_list(self):
        """
        Test getting list of posts
        """
        client = APIClient()
        res = client.get(reverse('posts'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreater(len(res.data), 0)

    def test_login(self):
        """
        Test logging in and getting a token
        """
        client = APIClient()
        self.log_in(self.first_user, client)

    def test_post_create_unauthorized(self):
        """
        Test creating a post anonymously (disallowed)
        """
        client = APIClient()
        res = client.post(reverse('posts'), {
            'body_text': self.post_body_text
        })
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_create_authorized(self):
        """
        Test creating a post while logged in
        """
        client = APIClient()
        self.log_in(self.first_user, client)
        res = client.post(reverse('posts'), {
            'body_text': self.post_body_text
        }, HTTP_AUTHORIZATION='JWT {}'.format(self.token))
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_signup(self):
        """
        Test signing up for a new account
        """
        client = APIClient()
        res = client.post(reverse('users'), {
            'username': self.second_user['username'],
            'email': self.second_user['email'],
            'password': self.second_user['password']
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', res.data)
