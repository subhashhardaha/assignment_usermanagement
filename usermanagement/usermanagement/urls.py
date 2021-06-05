"""usermanagement URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.db import router
from django.urls import path,include

from account import apis
from rest_framework.routers import DefaultRouter
# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'user', apis.AccountViewSet)
router.register(r'userrole', apis.AccountRoleViewSet)
router.register(r'role', apis.RoleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('user/', include('account.urls')),
    # The API URLs are now determined automatically by the router.
    path('api/', include(router.urls)),
]
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]